// components/DataTablePage.tsx
import { useState, useMemo, useImperativeHandle, RefObject, useEffect } from 'react';
import { GridColDef, GridPaginationModel, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, Collapse, Grid2 } from '@mui/material';
import DataTable from './dataTables';
import { FetchActionsType, TableRow } from '../types/fetch';
import FieldTool from './fieldTool';
import { ModalFieldConfig } from '../types/modal';
import { IoMdAdd, IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import { CiSearch, CiEraser } from "react-icons/ci";
import { useSearchParams } from 'react-router-dom';
import { GridApiCommunity } from '@mui/x-data-grid/internals';

interface DataTablePageProps<T> {
    dataType: Record<string, string>;
    fetchApi: () => FetchActionsType<T>;
    customRenderers?: {
        [key: string]: GridColDef;
    };
    onAdd?: () => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    extendColumns?: GridColDef[];
    ref?: RefObject<{ getData: () => void } | null>;
    paramFields?: ModalFieldConfig[];
    extendActions?: (params: GridRenderCellParams) => React.ReactNode;
    viewOnly?: boolean;
    extendButtons?: React.ReactNode;
    getParams?: Record<string, string>;
    selectMode?: boolean;
    paginationMode?: boolean;
    multiSelect?: boolean;
    gridApiRef?: RefObject<GridApiCommunity | null> | null;
}

function DataTablePage<T extends TableRow>({
    dataType,
    fetchApi,
    customRenderers = {},
    onAdd,
    onEdit,
    onDelete,
    extendColumns = [],
    ref,
    paramFields = [],
    extendActions,
    viewOnly = false,
    extendButtons = <></>,
    getParams = {},
    selectMode = false,
    paginationMode = false,
    multiSelect = false,
    gridApiRef = null,
}: DataTablePageProps<T>) {
    const [rows, setRows] = useState<T[]>([]);
    const [paramsData, setParamsData] = useState<Record<string, string>>({});
    const [advance, setAdvance] = useState(false);
    const [searchParams] = useSearchParams();
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });
    const [paginationRowCount, setPaginationRowCount] = useState(0);
    const columnWidth: Record<string, string> = useMemo(() => {
        const columnWidthList = localStorage.getItem("columnWidth");
        if (columnWidthList) {
            try {
                const parsedColumnWidth = JSON.parse(columnWidthList);
                return parsedColumnWidth;
            } catch (error) {
                console.error("Error parsing columnWidth from localStorage:", error);
            }
        }
        return {};
    }, []);

    const paramsDataInit = useMemo(() => {
        const tempFieldsData = paramFields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {} as Record<string, string>)
        // 處理處理sortFieldsData
        const sortFieldsData: Record<string, string> = paginationMode ? {
            sortBy: "",
            sortOrder: "",
        } : {}
        return { ...tempFieldsData, ...sortFieldsData };
    }, []);

    const paramFieldsHandle = useMemo(() => {
        const tempFields = paramFields.filter((field) => field.param).
            map(field => {
                const newField = { ...field };
                delete newField.disabled;
                return newField;
            })

        // 處理sortFields
        const sortedFields: ModalFieldConfig[] = paginationMode ? [
            {
                name: "sortBy", label: "排序欄位", type: "select", param: true,
                options: tempFields.map((field) => ({
                    label: field.label,
                    value: field.name,
                }))
            },
            {
                name: "sortOrder", label: "排序方式", type: "select", param: true, options: [
                    { label: "升冪", value: "asc" },
                    { label: "降冪", value: "desc" },
                ]
            },
        ] : []

        return [...tempFields, ...sortedFields];
    }, []);


    const api = fetchApi();


    const searchParamsHandle = useMemo(
        () => {
            if (searchParams.size > 0) {
                const params: Record<string, string> = { ...paramsDataInit };
                searchParams.forEach((value, key) => {
                    if (key !== "page" && key !== "size") {
                        params[key] = value;
                    }
                });
                setParamsData(params);
                setAdvance(true);
                return params;
            } else if (Object.keys(getParams).length > 0) {
                const params: Record<string, string> = { ...paramsDataInit };
                Object.keys(getParams).forEach((key) => {
                    params[key] = getParams[key];
                });
                setParamsData(params);
                return params;
            } else {
                setParamsData(paramsDataInit);
                return paramsDataInit;
            }
        },
        []
    )


    const getData = async (param: Record<string, string> = paramsData) => {
        // 移除空白參數
        const filteredParams = Object.fromEntries(
            Object.entries(param).filter(([, value]) => value.toString().trim() !== "")
        );
        if (paginationMode) {
            filteredParams.per_page = paginationModel.pageSize.toString();
            filteredParams.page = (paginationModel.page + 1).toString();
        }
        const result = await api.get(filteredParams);
        if (result.success) {
            if (paginationMode) {
                setRows(
                    result.data && 'items' in result.data && Array.isArray(result.data.items)
                        ? result.data.items as T[]
                        : []
                );
                setPaginationRowCount(
                    result.data && 'pagination' in result.data && typeof result.data.pagination === 'object' && 'total' in (result.data.pagination as { total: number })
                        ? (result.data.pagination as { total: number }).total
                        : 0
                );
            } else {
                setRows((result.data ?? []) as T[]);

            }
        }
    };


    useImperativeHandle(ref, () => ({
        getData,
    }));

    useEffect(() => {
        const params = searchParamsHandle;
        setParamsData(params);
    }, []);

    useEffect(() => {
        getData();
    }, [paginationModel]);

    const columns: GridColDef[] = useMemo(() => {
        const defaultActions: GridColDef[] = viewOnly || selectMode ? [] : [
            {
                field: 'operation',
                headerName: '操作',
                width: extendActions ? 150 : 150,
                headerAlign: 'center',
                sortable: false,          // 關閉排序
                filterable: false,        // 關閉過濾
                disableColumnMenu: true,  // 禁用列選單
                renderCell: (params) => (
                    <>
                        {extendActions && extendActions(params)}
                        <Button
                            size='small'
                            color="secondary"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit?.(params.row);
                            }}
                        >
                            編輯
                        </Button>
                        <Button
                            size='small'
                            color="error"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete?.(params.row);
                            }}
                        >
                            刪除
                        </Button>
                    </>
                ),
            }
        ]
        return [
            ...extendColumns,
            ...defaultActions,
            ...Object.keys(dataType).map<GridColDef>((key) => {
                let width = String(dataType[key]).length * 25;
                // 設定特定欄位 寬度
                switch (key) {
                    case "address":
                        width = 150;
                        break;
                    case "county":
                    case "district":
                        width = 70;
                        break;
                    case "name":
                        width = 100;
                        break;
                    case "filePath":
                        width = 150;
                        break;
                }
                const baseCol: GridColDef = {
                    field: key,
                    headerName: dataType[key],
                    // 判斷columnWidth是否存在 載入記錄寬度
                    width: columnWidth[key] ? Number(columnWidth[key]) : width,
                };
                return customRenderers[key]
                    ? { ...baseCol, ...customRenderers[key] }
                    : baseCol;
            }),
        ]
    }, []);

    const onSearch = () => {
        if (paginationMode) {
            setPaginationModel({
                page: 0,
                pageSize: paginationModel.pageSize,
            });
        } else {
            getData(paramsData);
        }
    }

    const onParamsClear = () => {
        const params = searchParamsHandle;
        setParamsData(params);
        if (paginationMode) {
            setPaginationModel({
                page: 0,
                pageSize: paginationModel.pageSize,
            });
        } else {
            getData(params);
        }
    }

    return (
        <>
            <Grid2 size={{ xs: 12, sm: 12 }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 1,
                }}>
                    <Box sx={{ marginRight: 1 }} hidden={viewOnly || selectMode}>
                        <Grid2 container spacing={1}>
                            <Button
                                startIcon={<IoMdAdd />}
                                variant='contained'
                                color='info'
                                onClick={onAdd}
                                component="div"
                            >新增</Button>
                            {extendButtons}
                        </Grid2>
                    </Box>
                    <Box hidden={paramFieldsHandle.length == 0}>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                visibility: advance ? 'visible' : 'hidden',
                                opacity: advance ? 1 : 0,
                                transform: advance ? 'translateY(0)' : 'translateY(-20px)',
                                transition: 'opacity 0.5s ease, transform 0.5s ease',
                            }}>
                            <Button
                                hidden={!advance}
                                sx={{ marginRight: 1 }}
                                variant="contained"
                                color="secondary"
                                onClick={onSearch}
                                startIcon={<CiSearch />}>
                                搜尋
                            </Button>
                            <Button
                                hidden={!advance}
                                sx={{ marginRight: 1 }}
                                variant="contained"
                                color="warning"
                                onClick={onParamsClear}
                                startIcon={<CiEraser />}>
                                清除
                            </Button>
                        </Box>
                        <Button

                            endIcon={advance ? <IoMdArrowUp /> : <IoMdArrowDown />}
                            variant='text'
                            color='info'
                            onClick={() => setAdvance(!advance)}
                            component="div"
                        >進階搜尋</Button>
                    </Box>
                </Box>
                <Collapse in={paramFieldsHandle.length > 0 && advance}>
                    <Grid2
                        container spacing={2}
                        border={1}
                        borderColor="divider"
                        p={1}
                    >
                        <FieldTool
                            fieldsData={paramsData}
                            setFieldsData={setParamsData}
                            fields={paramFieldsHandle}
                        />
                    </Grid2>
                </Collapse>
            </Grid2>
            <DataTable<T>
                columns={columns}
                rows={rows}
                paginationMode={paginationMode}
                paginationRowCount={paginationRowCount}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                checkbox={selectMode}
                multiSelect={multiSelect}
                gridApiRef={gridApiRef} />

        </>
    );
}

export default DataTablePage;
// components/DataTablePage.tsx
import { useState, useEffect, useMemo, useImperativeHandle, RefObject } from 'react';
import { GridColDef, GridRenderCellParams, GridValueGetter } from '@mui/x-data-grid';
import { Box, Button, Collapse, Grid2 } from '@mui/material';
import DataTable from './tables';
import { FetchActionsType, TableRow } from '../types/fetch';
import FieldTool from './field';
import { ModalFieldConfig } from '../types/modal';
import { IoMdAdd, IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';

interface DataTablePageProps<T> {
    dataType: Record<string, string>;
    fetchApi: () => FetchActionsType<T>;
    customRenderers?: {
        [key: string]: (param: GridValueGetter) => string;
    };
    onAdd?: () => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    extendColumns?: GridColDef[];
    ref?: RefObject<{ getData: () => void } | null>;
    paramFields?: ModalFieldConfig[];
    extendActions?: (params: GridRenderCellParams) => React.ReactNode;
}

function DataTablePage<T extends TableRow>({
    dataType,
    fetchApi,
    customRenderers = {},
    onAdd,
    onEdit,
    // onDelete,
    extendColumns = [],
    ref,
    paramFields = [],
    extendActions,
}: DataTablePageProps<T>) {
    const [rows, setRows] = useState<T[]>([]);
    const [paramsData, setParamsData] = useState<Record<string, string>>(
        paramFields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {} as Record<string, string>)
    );
    const [advance, setAdvance] = useState(false);

    const api = fetchApi();


    const getData = async (param: Record<string, string> = paramsData) => {
        const result = await api.get(param);
        if (result.success) {
            setRows((result.data ?? []) as T[]);
        }
    };


    useImperativeHandle(ref, () => ({
        getData,
    }));

    useEffect(() => {
        getData();
    }, []);

    const columns: GridColDef[] = useMemo(() => [
        {
            field: 'operation',
            headerName: '操作',
            width: extendActions ? 150 : 85,
            headerAlign: 'center',
            sortable: false,          // 關閉排序
            filterable: false,        // 關閉過濾
            disableColumnMenu: true,  // 禁用列選單
            renderCell: (params) => (
                <>
                    <Button
                        color="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(params.row);
                        }}
                    >
                        編輯
                    </Button>
                    {extendActions && extendActions(params)}

                    {/* <Button
                        color="error"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(params.row);
                        }}
                    >
                        刪除
                    </Button> */}
                </>
            ),
        },
        ...Object.keys(dataType).map<GridColDef>((key) => {
            let width = String(dataType[key]).length * 25;
            switch (key) {
                case "address":
                    width = 150;
                    break;
                case "county":
                case "district":
                case "town":
                    width = 65;
                    break;
            }
            const baseCol: GridColDef = {
                field: key,
                headerName: dataType[key],
                width
            };
            return customRenderers[key]
                ? { ...baseCol, valueGetter: customRenderers[key] }
                : baseCol;
        }),
        ...extendColumns,
    ], [customRenderers]);

    const onSearch = () => {
        getData(paramsData);
    }

    return (
        <>

            <Grid2 size={{ xs: 12, sm: 12 }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: advance ? 3 : 1,
                }}>
                    <Button
                        startIcon={<IoMdAdd />}
                        variant='contained'
                        color='info'
                        onClick={onAdd}
                        component="div"
                    >新增</Button>
                    <Button
                        hidden={Object.keys(paramsData).length == 0}
                        endIcon={advance ? <IoMdArrowUp /> : <IoMdArrowDown />}
                        variant='text'
                        color='info'
                        onClick={() => setAdvance(!advance)}
                        component="div"
                    >進階搜尋</Button>
                </Box>
                <Collapse in={Object.keys(paramsData).length > 0 && advance}>
                    <Box
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "repeat(2, 1fr)",
                                sm: "repeat(6, 1fr)",
                            },
                            gap: 2,
                        }}
                    >
                        <FieldTool
                            fieldsData={paramsData}
                            setFieldsData={setParamsData}
                            fields={paramFields}
                        />
                        <Button variant="contained" color="secondary" onClick={onSearch}>
                            搜尋
                        </Button>
                    </Box>
                </Collapse>

            </Grid2>

            <DataTable<T> columns={columns} rows={rows} />
        </>
    );
}

export default DataTablePage;
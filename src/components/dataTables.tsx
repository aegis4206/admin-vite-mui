import { DataGrid, GridColDef, GridColumnResizeParams, GridPaginationModel, GridRowClassNameParams, GridRowSelectionModel, useGridApiRef } from '@mui/x-data-grid';
import { Dispatch, RefObject, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import CustomPagination from './customPagination';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

interface TableRow {
    id?: string | number;
    Id?: string | number;
    // [key: string]: unknown;
}

interface DataTableProps<T extends TableRow> {
    columns: GridColDef[];
    rows: T[];
    setRows?: Dispatch<SetStateAction<T[]>>
    checkbox?: boolean;
    multiSelect?: boolean;
    gridApiRef?: RefObject<GridApiCommunity | null> | null;
    paginationMode?: boolean;
    paginationRowCount?: number;
    paginationModel?: GridPaginationModel;
    setPaginationModel?: Dispatch<SetStateAction<GridPaginationModel>>
    isDetailTable?: boolean;
}

export default function DataTable<T extends TableRow>({ columns, rows, checkbox = false, multiSelect = false, gridApiRef = null, paginationMode = false, paginationRowCount = 0, paginationModel, setPaginationModel, isDetailTable }: DataTableProps<T>) {
    const [checkboxSelected, setCheckboxSelected] = useState<GridRowSelectionModel>([]);
    // const [, setGridApiRef] = useAtom(gridApiRefAtom)
    const { t, i18n } = useTranslation();
    const tableRef: RefObject<GridApiCommunity> = useGridApiRef();

    useEffect(() => {
        if (!gridApiRef) return;
        gridApiRef.current = tableRef.current;

        return () => {
        }
    }, [tableRef, gridApiRef]);

    const selectChangeHandle = (newSelectionModel: GridRowSelectionModel) => {
        if (!checkbox) return;
        // if (!multiSelect && newSelectionModel.length > 1) {
        //     setCheckboxSelected([newSelectionModel[1]]);
        // } else {
        //     setCheckboxSelected(newSelectionModel);
        // }
        setCheckboxSelected(newSelectionModel);
    }

    const localeText = useMemo(() => ({
        noRowsLabel: t('dataGrid.noRowsLabel'),
        noResultsOverlayLabel: t('dataGrid.noResultsOverlayLabel'),
        errorOverlayDefaultLabel: t('dataGrid.errorOverlayDefaultLabel'),
        toolbarDensity: t('dataGrid.toolbarDensity'),
        toolbarDensityLabel: t('dataGrid.toolbarDensityLabel'),
        toolbarDensityCompact: t('dataGrid.toolbarDensityCompact'),
        toolbarDensityStandard: t('dataGrid.toolbarDensityStandard'),
        toolbarDensityComfortable: t('dataGrid.toolbarDensityComfortable'),
        toolbarColumns: t('dataGrid.toolbarColumns'),
        toolbarColumnsLabel: t('dataGrid.toolbarColumnsLabel'),
        toolbarFilters: t('dataGrid.toolbarFilters'),
        toolbarFiltersLabel: t('dataGrid.toolbarFiltersLabel'),
        toolbarFiltersTooltipHide: t('dataGrid.toolbarFiltersTooltipHide'),
        toolbarFiltersTooltipShow: t('dataGrid.toolbarFiltersTooltipShow'),
        toolbarFiltersTooltipActive: (count: number) =>
            t('dataGrid.toolbarFiltersTooltipActive', { count }),
        toolbarQuickFilterPlaceholder: t('dataGrid.toolbarQuickFilterPlaceholder'),
        toolbarQuickFilterLabel: t('dataGrid.toolbarQuickFilterLabel'),
        toolbarQuickFilterDeleteIconLabel: t('dataGrid.toolbarQuickFilterDeleteIconLabel'),
        toolbarExport: t('dataGrid.toolbarExport'),
        toolbarExportLabel: t('dataGrid.toolbarExportLabel'),
        toolbarExportCSV: t('dataGrid.toolbarExportCSV'),
        toolbarExportPrint: t('dataGrid.toolbarExportPrint'),
        toolbarExportExcel: t('dataGrid.toolbarExportExcel'),
        columnsPanelTextFieldLabel: t('dataGrid.columnsPanelTextFieldLabel'),
        columnsPanelTextFieldPlaceholder: t('dataGrid.columnsPanelTextFieldPlaceholder'),
        columnsPanelDragIconLabel: t('dataGrid.columnsPanelDragIconLabel'),
        columnsPanelShowAllButton: t('dataGrid.columnsPanelShowAllButton'),
        columnsPanelHideAllButton: t('dataGrid.columnsPanelHideAllButton'),
        columnsManagementShowHideAllText: t('dataGrid.columnsManagementShowHideAllText'), // 補充：Show/Hide All
        filterPanelAddFilter: t('dataGrid.filterPanelAddFilter'),
        filterPanelDeleteIconLabel: t('dataGrid.filterPanelDeleteIconLabel'),
        filterPanelLinkOperator: t('dataGrid.filterPanelLinkOperator'),
        filterPanelOperator: t('dataGrid.filterPanelOperator'),
        filterPanelOperatorAnd: t('dataGrid.filterPanelOperatorAnd'),
        filterPanelOperatorOr: t('dataGrid.filterPanelOperatorOr'),
        filterPanelColumns: t('dataGrid.filterPanelColumns'),
        filterPanelInputLabel: t('dataGrid.filterPanelInputLabel'),
        filterPanelInputPlaceholder: t('dataGrid.filterPanelInputPlaceholder'),
        filterOperatorContains: t('dataGrid.filterOperatorContains'),
        filterOperatorDoesNotContain: t('dataGrid.filterOperatorDoesNotContain'), // 補充：不包含
        filterOperatorEquals: t('dataGrid.filterOperatorEquals'),
        filterOperatorDoesNotEqual: t('dataGrid.filterOperatorDoesNotEqual'), // 補充：不等於
        filterOperatorStartsWith: t('dataGrid.filterOperatorStartsWith'),
        filterOperatorEndsWith: t('dataGrid.filterOperatorEndsWith'),
        filterOperatorIs: t('dataGrid.filterOperatorIs'),
        filterOperatorNot: t('dataGrid.filterOperatorNot'),
        filterOperatorAfter: t('dataGrid.filterOperatorAfter'),
        filterOperatorOnOrAfter: t('dataGrid.filterOperatorOnOrAfter'),
        filterOperatorBefore: t('dataGrid.filterOperatorBefore'),
        filterOperatorOnOrBefore: t('dataGrid.filterOperatorOnOrBefore'),
        filterOperatorIsEmpty: t('dataGrid.filterOperatorIsEmpty'),
        filterOperatorIsNotEmpty: t('dataGrid.filterOperatorIsNotEmpty'),
        filterOperatorIsAnyOf: t('dataGrid.filterOperatorIsAnyOf'),
        filterValueAny: t('dataGrid.filterValueAny'),
        filterValueTrue: t('dataGrid.filterValueTrue'),
        filterValueFalse: t('dataGrid.filterValueFalse'),
        columnsManagementSearchTitle: t('dataGrid.columnsManagementSearchTitle'),
        columnsManagementNoColumns: t('dataGrid.columnsManagementNoColumns'),
        columnsManagementShowHideToolbarLabel: t('dataGrid.columnsManagementShowHideToolbarLabel'),
        columnsManagementReset: t('dataGrid.columnsManagementReset'),
        columnMenuLabel: t('dataGrid.columnMenuLabel'),
        columnMenuShowColumns: t('dataGrid.columnMenuShowColumns'),
        columnMenuHideColumn: t('dataGrid.columnMenuHideColumn'),
        columnMenuUnsort: t('dataGrid.columnMenuUnsort'),
        columnMenuSortAsc: t('dataGrid.columnMenuSortAsc'),
        columnMenuSortDesc: t('dataGrid.columnMenuSortDesc'),
        columnMenuFilter: t('dataGrid.columnMenuFilter'),
        columnMenuManageColumns: t('dataGrid.columnMenuManageColumns'),
        footerRowSelected: (count: number) => t('dataGrid.footerRowSelected', { count }),
        footerTotalRows: t('dataGrid.footerTotalRows'),
        footerTotalVisibleRows: (visibleCount: number, totalCount: number) =>
            t('dataGrid.footerTotalVisibleRows', { visibleCount, totalCount }),
        footerPaginationRowsPerPage: t('dataGrid.footerPaginationRowsPerPage'),
        MuiTablePagination: {
            labelRowsPerPage: t('dataGrid.MuiTablePagination.labelRowsPerPage'),
            labelDisplayedRows: ({ from, to, count }: { from: number; to: number; count: number }) =>
                t('dataGrid.MuiTablePagination.labelDisplayedRows', { from, to, count }),
            getItemAriaLabel: (type: string) =>
                t(`dataGrid.MuiTablePagination.getItemAriaLabel.${type}`),
        },
    }), [t, i18n.language]);

    // const rowChangeHandle = (newSelectionModel: unknown, type: string) => {
    //     console.log(type, newSelectionModel);
    // }
    const onColumnWidthChange = (params: GridColumnResizeParams) => {
        const columnWidthList = localStorage.getItem("columnWidth");
        if (columnWidthList) {
            try {
                const newColumnWidthList = JSON.parse(columnWidthList);
                localStorage.setItem("columnWidth", JSON.stringify({ ...newColumnWidthList, [params.colDef.field]: params.width }));
            } catch (error) {
                console.error("Error parsing columnWidthList from localStorage:", error);
            }
        } else {
            localStorage.setItem("columnWidth", JSON.stringify({ [params.colDef.field]: params.width }));
        }
    }

    const location = useLocation();
    const onColumnVisibilityModelChange = (newModel: { [key: string]: boolean }) => {
        if (Object.keys(newModel).length === 0) return;
        const columnVisibilityList = localStorage.getItem("columnVisibility");
        if (columnVisibilityList) {
            try {
                const newColumnVisibilityList = JSON.parse(columnVisibilityList);
                localStorage.setItem("columnVisibility", JSON.stringify({
                    ...newColumnVisibilityList,
                    [location.pathname]: newModel
                }));
            } catch (error) {
                console.error("Error parsing columnVisibilityList from localStorage:", error);
            }
        } else {
            localStorage.setItem("columnVisibility", JSON.stringify({ [location.pathname]: newModel }));
        }
    }

    useEffect(() => {
        if (tableRef && tableRef.current) {
            tableRef.current.setColumnVisibilityModel(
                JSON.parse(localStorage.getItem("columnVisibility") || "{}")[location.pathname] || {}
            );
        }
    }, [tableRef, location.pathname]);

    // 處理非detail欄位樣式
    const getRowClassName = (params: GridRowClassNameParams) => {
        if (params.row.isDetail) return 'expand-detailCell';
        return '';
    };



    return (
        <Box sx={{
            width: '100%',
        }}>
            <DataGrid
                apiRef={tableRef}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                // pageSizeOptions={[5, 10, 20, 50, 100]}
                slotProps={{
                    // pagination: {
                    // showFirstButton: true,
                    // showLastButton: true,

                    // },
                }}
                slots={{
                    pagination: CustomPagination,
                }}
                disableMultipleRowSelection={!multiSelect}
                checkboxSelection={checkbox}
                onRowSelectionModelChange={!checkbox ? undefined : selectChangeHandle}
                rowSelectionModel={!checkbox ? undefined : checkboxSelected}
                getRowId={(row: T) => row.id || row.Id!}
                localeText={{
                    ...localeText,
                }}
                sx={{
                    minWidth: '50px',
                    overflowY: 'auto',
                    '& .MuiDataGrid-cell': {
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        overflow: 'visible',

                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '14px',
                        // color: '#333',
                        alignContent: 'center',
                    },
                    // '& .MuiDataGrid-row': {
                    // height: 'auto',
                    // backgroundColor: 'white',
                    // },
                    border: '1px solid #e0e0e0',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#1976d2',
                        color: '#1976d2',
                        fontSize: '16px',
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#e3f2fd',
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: '#bbdefb',
                    },
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },

                    '& .MuiDataGrid-selectedRowCount': {
                        display: checkbox ? '' : 'none',
                    },
                    '& .MuiDataGrid-scrollbar--horizontal': {
                        '& *': {
                            tabIndex: -1, // 確保滾動條內的子元素不可聚焦
                        },
                    },
                    // 移除單元格聚焦時的外框
                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                        outline: 'none',
                    },

                    '.expand-detailCell .MuiDataGrid-cellCheckbox': {
                        display: 'none!important',
                    }
                }}
                getRowHeight={() => 'auto'}

                // 分頁設定
                paginationModel={paginationMode ? paginationModel : undefined}
                onPaginationModelChange={paginationMode ? setPaginationModel : undefined}
                paginationMode={paginationMode ? "server" : undefined}
                rowCount={paginationMode ? paginationRowCount : undefined}
                // disableColumnMenu={paginationMode}
                disableColumnFilter={paginationMode}
                disableColumnSorting={paginationMode}
                // onCellEditStop={(cell) => rowChangeHandle(cell, "cell")}

                // 處理欄位寬度變化
                onColumnWidthChange={onColumnWidthChange}

                // 處理行編輯 改單擊
                onCellClick={(params) => {
                    if (params.colDef.editable) {
                        tableRef.current.startCellEditMode({
                            id: params.id,
                            field: params.field,
                        });
                    }
                }}

                // 處理欄位選擇
                onColumnVisibilityModelChange={onColumnVisibilityModelChange}

                // 處理Detail行
                getRowClassName={isDetailTable ? getRowClassName : undefined}
                isRowSelectable={isDetailTable ? (params) => !("isDetail" in params.row && "expand" in params.row) : undefined}
            />
        </Box >
    );
}
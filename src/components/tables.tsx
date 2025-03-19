import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useAtom } from "jotai";
import { checkboxSelectedAtom } from '../states/table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface TableRow {
    id?: string | number;
    Id?: string | number;
    // [key: string]: unknown;
}

interface DataTableProps<T extends TableRow> {
    columns: GridColDef[];
    rows: T[];
    checkbox?: boolean;
}

export default function DataTable<T extends TableRow>({ columns, rows, checkbox = false }: DataTableProps<T>) {
    const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom)
    const { t, i18n } = useTranslation();

    const selectChangeHandle = (newSelectionModel: GridRowSelectionModel) => {
        console.log('Selected rows:', newSelectionModel);
        if (checkbox) setCheckboxSelected(newSelectionModel);
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

    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={checkbox}
                onRowSelectionModelChange={!checkbox ? undefined : selectChangeHandle}
                rowSelectionModel={!checkbox ? undefined : checkboxSelected}
                getRowId={(row: T) => row.id || row.Id!}
                localeText={{
                    ...localeText,
                    // filterPanelOperator: "123"
                    // columnsManagementShowHideAllText:
                }}
                sx={{
                    minWidth: '50px',
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
                        display: 'none', // 暫時隱藏選取行數
                    },
                }}
                getRowHeight={() => 'auto'}
            />
        </div >
    );
}
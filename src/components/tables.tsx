import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useAtom } from "jotai";
import { checkboxSelectedAtom } from '../states/table';

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


    const selectChangeHandle = (newSelectionModel: GridRowSelectionModel) => {
        console.log('Selected rows:', newSelectionModel);
        if (checkbox) setCheckboxSelected(newSelectionModel);
    }


    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={checkbox}
                onRowSelectionModelChange={!checkbox ? undefined : selectChangeHandle}
                rowSelectionModel={!checkbox ? undefined : checkboxSelected}
                getRowId={(row: T) => row.id || row.Id!}
                localeText={{
                    noRowsLabel: "尚未有任何資料"
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
                    },
                    // '& .MuiDataGrid-row': {
                    // height: 'auto',
                    // backgroundColor: 'white',
                    // },
                    border: '1px solid #e0e0e0',
                    '& .MuiDataGrid-columnHeaders': {
                        // backgroundColor: '#1976d2',
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
// components/DataTablePage.tsx
import { useState, useEffect, useMemo, useImperativeHandle, RefObject } from 'react';
import { GridColDef, GridValueGetter } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DataTable from './tables';
import { FetchActionsType, TableRow } from '../types/fetch';

interface DataTablePageProps<T> {
    dataType: Record<string, string>;
    fetchApi: () => FetchActionsType<T>;
    customRenderers?: {
        [key: string]: (param: GridValueGetter) => string;
    };
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    extendColumns?: GridColDef[];
    ref?: RefObject<{ getData: () => void } | null>;
}

function DataTablePage<T extends TableRow>({
    dataType,
    fetchApi,
    customRenderers = {},
    onEdit,
    // onDelete,
    extendColumns = [],
    ref,
}: DataTablePageProps<T>) {
    const [rows, setRows] = useState<T[]>([]);
    const api = fetchApi();

    const getData = async () => {
        const result = await api.get();
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
            width: 80,
            headerAlign: 'center',
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
            const baseCol: GridColDef = {
                field: key,
                headerName: dataType[key],
                width: key === "address" ? 150 : String(dataType[key]).length * 25,
            };
            return customRenderers[key]
                ? { ...baseCol, valueGetter: customRenderers[key] }
                : baseCol;
        }),
        ...extendColumns,
    ], [customRenderers]);

    return (
        <>
            <DataTable<T> columns={columns} rows={rows} />
        </>
    );
}

export default DataTablePage;
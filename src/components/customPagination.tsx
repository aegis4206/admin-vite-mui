// components/CustomTablePagination.tsx
import React, { useMemo } from 'react';
import {
    Pagination,
    PaginationItem,
    Box,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import {
    useGridApiContext,
    useGridSelector,
    gridPageSelector,
    gridPageCountSelector,
    gridPageSizeSelector,
    gridRowCountSelector,
} from '@mui/x-data-grid';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';


const CustomTablePagination = () => {
    const apiRef = useGridApiContext();

    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
    const rowCount = useGridSelector(apiRef, gridRowCountSelector);

    const { t, i18n } = useTranslation();

    const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
        apiRef.current.setPage(value - 1);
    };


    const handlePageSizeChange = (
        event: SelectChangeEvent<number>
    ) => {
        apiRef.current.setPageSize(Number(event.target.value));
    };

    const from = page * pageSize + 1;
    const to = Math.min(rowCount, (page + 1) * pageSize);

    const localeText = useMemo(() => ({

        labelRowsPerPage: t('dataGrid.MuiTablePagination.labelRowsPerPage'),
        labelDisplayedRows: ({ from, to, count }: { from: number; to: number; count: number }) =>
            t('dataGrid.MuiTablePagination.labelDisplayedRows', { from, to, count }),
        getItemAriaLabel: (type: string) =>
            t(`dataGrid.MuiTablePagination.getItemAriaLabel.${type}`),
        labelGotoPage: (page: number) =>
            t('dataGrid.MuiTablePagination.labelGotoPage', { page }),
    }), [t, i18n.language]);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="10px"
        >
            {/* Rows per page selector */}
            <Box display="flex" alignItems="center">
                <Typography variant="body2" mr={1}>
                    {localeText.labelRowsPerPage}
                </Typography>
                <Select
                    variant="standard"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    size="small"
                    disableUnderline
                >
                    {[5, 10, 20, 50, 100].map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Range info */}
            <Typography variant="body2">
                {localeText.labelDisplayedRows({ from, to, count: rowCount })}
            </Typography>

            {/* Pagination */}
            <Pagination
                count={pageCount}
                page={page + 1}
                onChange={handleChangePage}
                siblingCount={1}
                // boundaryCount={1}
                // showFirstButton
                // showLastButton
                size="small"
                color="primary"
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        // aria-label={(() =>
                        //     localeText.getItemAriaLabel(item.type)
                        // )()}
                        title={(() => {
                            switch (item.type) {
                                case 'page':
                                    return localeText.labelGotoPage(item.page ? item.page : 0);
                                case 'first':
                                    return localeText.getItemAriaLabel('first');
                                case 'last':
                                    return localeText.getItemAriaLabel('last');
                                case 'next':
                                    return localeText.getItemAriaLabel('next');
                                case 'previous':
                                    return localeText.getItemAriaLabel('previous');
                                default:
                                    return '';
                            }
                        }
                        )()}
                    />
                )}
            />
        </Box >
    );
};

export default CustomTablePagination;

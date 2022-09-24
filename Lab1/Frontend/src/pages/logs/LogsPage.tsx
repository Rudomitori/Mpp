import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import {FC, useCallback, useMemo, useState} from "react";
import {useLogs} from "../../api/LogsApi";
import {IApiLogItem} from "../../api/models/ApiLogItem";
import {Container} from "@mui/material";

const LogsTableHead: FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell align={'left'}>
                    Date
                </TableCell>
                <TableCell align={'left'}>
                    Action
                </TableCell>
                <TableCell align={'left'}>
                    User
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

const LogsTableToolbar: FC<{
    onRefresh?: () => void
}> = (props) => {
    return (
        <Toolbar sx={{flexDirection: "row-reverse"}}>
            {props.onRefresh && (
                <IconButton onClick={props.onRefresh}>
                    <RefreshIcon/>
                </IconButton>
            )}
        </Toolbar>
    );
};

const LogsTablePagination: FC<{
    onPageChange: (page: number) => void,
    onRowsPerPageChanged: (newValue: number) => void,
    rowsPerPage: number,
    rowsCount: number,
    page: number,
}> = (props) => {
    const {onPageChange, onRowsPerPageChanged, page, rowsPerPage, rowsCount} = props;

    const handlePageChange = useCallback((event: unknown, newPage: number) => {
        onPageChange(newPage);
    }, [onPageChange])

    const handleRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        onRowsPerPageChanged(newValue);
    }, [onRowsPerPageChanged]);

    return (
        <TablePagination
            sx={{flex: "auto 0 0"}}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rowsCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
        />
    )
}

const LogsTable: FC<{
    logs: IApiLogItem[]
    page: number,
    rowsPerPage: number,
}> = (props) => {
    const {logs, page, rowsPerPage} = props;

    const currentPageLogs = useMemo(() => {
        return logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [page, rowsPerPage, logs]);

    const emptyRows = rowsPerPage - currentPageLogs.length;

    return (
        <TableContainer>
            <Table
                size={'small'}
                stickyHeader
            >
                <LogsTableHead/>
                <TableBody sx={{overflow:"auto"}}>
                    {currentPageLogs.map((row) => (
                        <TableRow
                            hover
                            key={row.id}>
                            <TableCell align="left">{row.date.toISOTime()}</TableCell>
                            <TableCell align="left">{row.action}</TableCell>
                            <TableCell align="left">{row.user?.login ?? ''}</TableCell>
                        </TableRow>
                    ))}
                    {[...Array(emptyRows).keys()].map((x, i) => (
                        <TableRow key={i}>
                            <TableCell align={"center"} colSpan={6}>{"- - -"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const LogsPage: FC = () => {
    const logs = useLogs(true);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const refreshLogs = useCallback(() => {
        // noinspection JSIgnoredPromiseFromCall
        logs.refetch();
    }, [logs]);

    return (
        <Container maxWidth="md" sx={{py:4, height: "100%"}}>
            <Paper sx={{
                maxHeight: "100%",
                overflow:"auto",
                display: "flex",
                flexDirection: "column"
            }}>
                <LogsTableToolbar onRefresh={refreshLogs}/>
                <LogsTable
                    logs={logs.data ?? []}
                    page={page}
                    rowsPerPage={rowsPerPage}/>
                <LogsTablePagination
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setPage}
                    onRowsPerPageChanged={setRowsPerPage}
                    rowsCount={logs.data?.length ?? 0}/>
            </Paper>
        </Container>
        
    )
}

export default LogsPage;
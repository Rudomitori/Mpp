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
import {Container} from "@mui/material";
import {useMessagesStatistic} from "../../api/MessagesApi";
import {useUsers} from "../../api/UsersApi";

interface IStatisticVm {
    sender: string,
    receiver: string,
    count: number,
}

const StatisticTableHead: FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell align={'left'}>
                    Sender
                </TableCell>
                <TableCell align={'left'}>
                    Receiver
                </TableCell>
                <TableCell align={'left'}>
                    Messages
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

const StatisticTableToolbar: FC<{
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

const StatisticTablePagination: FC<{
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

const StatisticTable: FC<{
    vms: IStatisticVm[]
    page: number,
    rowsPerPage: number,
}> = (props) => {
    const {vms, page, rowsPerPage} = props;

    const currentPageLogs = useMemo(() => {
        return vms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [page, rowsPerPage, vms]);

    const emptyRows = rowsPerPage - currentPageLogs.length;

    return (
        <TableContainer>
            <Table
                size={'small'}
                stickyHeader
            >
                <StatisticTableHead/>
                <TableBody sx={{overflow:"auto"}}>
                    {currentPageLogs.map((row, i) => (
                        <TableRow
                            hover
                            key={i}>
                            <TableCell align="left">{row.sender}</TableCell>
                            <TableCell align="left">{row.receiver}</TableCell>
                            <TableCell align="left">{row.count}</TableCell>
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

const StatisticPage: FC = () => {
    const statistics = useMessagesStatistic();
    const users = useUsers();
    
    const vms: IStatisticVm[] = statistics.isLoading || users.isLoading 
        ? []
        : statistics.data!.map(x => ({
            sender: users.data!.find(y => y.id === x.fromId)!.login,
            receiver: users.data!.find(y => y.id === x.toId)!.login,
            count: x.count,
        }))

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const refreshLogs = () => {
        // noinspection JSIgnoredPromiseFromCall
        statistics.refetch();
        // noinspection JSIgnoredPromiseFromCall
        users.refetch();
    };

    return (
        <Container maxWidth="md" sx={{py:4, height: "100%"}}>
            <Paper sx={{
                maxHeight: "100%",
                overflow:"auto",
                display: "flex",
                flexDirection: "column"
            }}>
                <StatisticTableToolbar onRefresh={refreshLogs}/>
                <StatisticTable
                    vms={vms}
                    page={page}
                    rowsPerPage={rowsPerPage}/>
                <StatisticTablePagination
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setPage}
                    onRowsPerPageChanged={setRowsPerPage}
                    rowsCount={vms.length}/>
            </Paper>
        </Container>

    )
}

export default StatisticPage;
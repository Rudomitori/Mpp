import {FC, useState} from "react";
import UsersApi, {useUsers} from "../../api/UsersApi";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    Stack,
    TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import PasswordIcon from '@mui/icons-material/Password';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Paper from "@mui/material/Paper";
import {useAuth} from "../../contexts/authContext";
import Toolbar from "@mui/material/Toolbar";
import useStateWithDeps from "../../utils/hooks/useStateWithDeps";

interface IPageProps {

}

const UsersPage: FC<IPageProps> = (props) => {
    const auth = useAuth();
    const users = useUsers();

    const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null as string | null);
    const onCloseChangePasswordModal = () => {
        setChangePasswordModalIsOpen(false);
        setSelectedUserId(null);
    };
    const onSavePassword = (password: string) => {
        // noinspection JSIgnoredPromiseFromCall
        UsersApi.changePassword({userId: selectedUserId!, password})
        onCloseChangePasswordModal();
    };

    const [createUserModalIsOpen, setCreateUserModalIsOpen] = useState(false);
    const onCloseCreateUserModal = () => {
        setCreateUserModalIsOpen(false);
    };
    const onSaveUser = async (login: string, password: string) => {
        onCloseCreateUserModal();
        await UsersApi.create({login, password});
        // noinspection ES6MissingAwait
        users.refetch()
    };

    return (
        <>
            <Container maxWidth="md" sx={{my: 4}}>
                {auth.user!.isAdmin && (
                    <Paper sx={{mb: 2}}>
                        <Toolbar sx={{display: "flex", flexDirection: "row-reverse"}}>
                            <IconButton
                                title={"Add user"}
                                onClick={() => setCreateUserModalIsOpen(true)}>
                                <AddCircleIcon color={"success"}/>
                            </IconButton>
                        </Toolbar>
                    </Paper>
                )}
                <Paper>
                    <List sx={{display: "flex", gap: 2, flexDirection: "column", p: 2}}>
                        {(users.data ?? []).map(x => (
                            <Paper key={x.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={x.login}
                                        secondary={x.isAdmin ? "Admin" : ""}/>

                                    <IconButton title={"Open chat"}>
                                        <CommentIcon color={"primary"}/>
                                    </IconButton>

                                    {auth.user!.isAdmin && (
                                        <>
                                            <IconButton
                                                title={"Change password"}
                                                onClick={() => {
                                                    setSelectedUserId(x.id);
                                                    setChangePasswordModalIsOpen(true);
                                                }}>
                                                <PasswordIcon/>
                                            </IconButton>

                                            <IconButton
                                                title={"Delete user"}
                                                onClick={async () => {
                                                    await UsersApi.deleteUser({userId: x.id});
                                                    // noinspection ES6MissingAwait
                                                    users.refetch();
                                                }}>
                                                <DeleteIcon color={"error"}/>
                                            </IconButton>
                                        </>
                                    )}
                                </ListItem>
                            </Paper>
                        ))}
                    </List>
                </Paper>
            </Container>
            <ChangePasswordDialog
                onCancel={onCloseChangePasswordModal}
                open={changePasswordModalIsOpen}
                onSave={onSavePassword}/>
            <CreateUserDialog
                onCancel={onCloseCreateUserModal}
                open={createUserModalIsOpen}
                onSave={onSaveUser}/>
        </>
    )
}

const ChangePasswordDialog: FC<{
    open: boolean,
    onCancel: () => void,
    onSave: (newPassword: string) => void
}> = (props) => {
    const [password, setPassword] = useStateWithDeps(() => "", [props.open]);

    return (
        <Dialog open={props.open} onClose={props.onCancel}>
            <DialogContent>
                <TextField
                    label="New password"
                    autoFocus type="password"
                    value={password} name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={props.onCancel}>Cancel</Button>
                <Button color="primary" onClick={() => props.onSave(password)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

const CreateUserDialog: FC<{
    open: boolean,
    onCancel: () => void,
    onSave: (login: string, password: string) => void
}> = (props) => {
    const [login, setLogin] = useStateWithDeps(() => "", [props.open]);
    const [password, setPassword] = useStateWithDeps(() => "", [props.open]);

    return (
        <Dialog open={props.open} onClose={props.onCancel}>
            <DialogContent>
                <Stack direction={"column"} gap={2}>
                    <TextField
                        label="Login"
                        autoFocus type="text"
                        value={login} name="login"
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <TextField
                        label="New password"
                        autoFocus type="password"
                        value={password} name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={props.onCancel}>Cancel</Button>
                <Button color="primary" onClick={() => props.onSave(login, password)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UsersPage;
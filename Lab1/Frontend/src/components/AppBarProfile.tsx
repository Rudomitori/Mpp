import {useAuth} from "../contexts/authContext";
import {Box, Button, Menu, MenuItem, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useState} from "react";

const AppBarProfile = () => {
    const auth = useAuth();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    return (
        <>
            {auth.user && (
                <Box sx={{flexGrow: 0}}>
                    <Button
                        color={"inherit"}
                        onClick={e => setAnchorElUser(e.currentTarget)}>
                        {auth.user.login}
                    </Button>
                    <Menu
                        sx={{mt: 1}}
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClick={() => setAnchorElUser(null)}>
                        <MenuItem onClick={auth.signOut}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            )}
            {!auth.user && (
                <>
                    <Button
                        component={NavLink} to={"/login"}
                        sx={{
                            color: "inherit"
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        component={NavLink} to={"/register"}
                        sx={{
                            color: "inherit"
                        }}
                    >
                        Sign up
                    </Button>
                </>

            )}
        </>
    )
}

export default AppBarProfile;
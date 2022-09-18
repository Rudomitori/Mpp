import {useAuth} from "../contexts/authContext";
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";

const AppBarProfile = () => {
    const auth = useAuth();

    return (
        <>
            {auth.user && (
                <Button color={"inherit"} onClick={auth.signOut}>Logout</Button>
            )}
            {!auth.user && (
                <>
                    <Button
                        component={NavLink} to={"/login"}
                        sx={{
                            color:"inherit"
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        component={NavLink} to={"/register"}
                        sx={{
                            color:"inherit"
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
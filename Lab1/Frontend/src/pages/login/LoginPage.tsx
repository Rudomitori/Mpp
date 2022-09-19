import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {FC, FormEvent, useState} from "react";
import {useAuth} from "../../contexts/authContext";
import {useLocation, useNavigate} from "react-router-dom";

interface IPageProps {

}

const LoginPage: FC<IPageProps> = (props) => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await auth.signIn(login, password);
        const backUrl = (location.state as any)?.backUrl;
        if(typeof backUrl === "string") 
            navigate(backUrl);
        else 
            navigate("/buttons");
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center",
                height: "100%"
            }}
        >
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Stack spacing={2}>
                    <TextField
                        required
                        size="small"
                        fullWidth
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        label="Login"
                        name="login"
                        autoComplete="login"
                    />
                    <TextField
                        required
                        size="small"
                        fullWidth
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign in
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default LoginPage;
import {FC} from "react";
import {Box, CircularProgress} from "@mui/material";

const LoadingPlaceholder: FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
            <CircularProgress />
        </Box>
    )
}

export default LoadingPlaceholder;
import {FC} from "react";
import {Container, Typography} from "@mui/material";

const AboutPage: FC = () => {
    
    return (
        <Container maxWidth="md" sx={{my: 4}}>
            <Typography variant="h5">
                General
            </Typography>
            <Typography>
                This site is laboratory work on the subject "Moder programming platforms"
            </Typography>
            <Typography variant="h5">
                Tech
            </Typography>
            <Typography>
                The site was made with .NET 6, ASP.NET Core, React, MUIv5, and PostgreSQL.
            </Typography>
            <Typography variant="h5">
                Author
            </Typography>
            <Typography>
                Dmitry Zhavoronkov. A TPU master's degree student.
            </Typography>
            <Typography variant="h6">
                Concacts
            </Typography>
            <Typography>
                Email: rudomitori@gmail.com
            </Typography>
        </Container>
    )
}

export default AboutPage;
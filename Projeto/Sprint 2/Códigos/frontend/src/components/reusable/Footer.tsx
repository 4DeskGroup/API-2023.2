import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export default function Footer() {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#136935',
            },
            secondary: {
                main: "#FFFFFF",
            },
        },
    });

    return (

        <ThemeProvider theme={theme}>
            <AppBar
                color="primary"
                sx={{
                    height: "6vh",
                    maxWidth: '100%',
                    boxShadow: 5,
                    position: 'fixed',
                    top: 'auto',
                    bottom: 0,
                    zIndex: 0
                }}
            >
            </AppBar>

            <Typography
                color="secondary"
                sx={{
                    fontFamily: "poppins",
                    variant: "filledTonal",
                    fontSize: 14,
                    position: 'fixed',
                    top: 'auto',
                    bottom: 7,
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center',  
                    width: '100%',  
                }}
            >
                Greenneat | 2023
            </Typography>
        </ThemeProvider>
    );
}
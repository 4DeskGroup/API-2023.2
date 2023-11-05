import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import extrato from "../images/extrato.png"
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";


export default function EstEstoqueTitulo() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#136935",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });
 
  return (
    <ThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{
          bgcolor: "#ffffff",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: "80%",
          width: "100%",
          // padding: '5%',
          mt: 15,
          borderRadius: 3
        }} >
          <Grid container spacing={1}>

            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <img src={extrato} alt="png" width="50%" />
            </Grid>

            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
              <Typography sx={{ fontSize: '25px', fontFamily: 'actor' }}>
                 Histórico de Greenneats
              </Typography>
            </Grid>

          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  </ThemeProvider>
);
}

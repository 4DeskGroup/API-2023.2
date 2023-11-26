import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";


export default function AdmUsuarioSubtitulo() {
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
          mt: 2,
          borderRadius: 3
        }} >
          <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={3} lg={1} xl={12}></Grid>
            <Grid item xs={6}>
              {/* <Typography sx={{ fontSize: '15px', fontFamily: 'actor' }}>
                Selecione a opção desejada:
              </Typography> */}
            </Grid>

          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  </ThemeProvider>
);
}

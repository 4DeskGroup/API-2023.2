import React from "react";
import { ThemeProvider } from "styled-components";
import AdmLeftMenu from "../components/reusable/adm-left-menu";
import Footer from "../components/reusable/Footer";
import ParcSubtituloTransferir from "../components/transf-realiz-usuario.tsx/parc-subtitulo-transferir";
import { Box, Container, Grid, createTheme, useMediaQuery } from "@mui/material";
import ParcTituloTransfUsu from "../components/transf-realiz-usuario.tsx/parc-titulo-transf-usu";
import Tabela from "../components/transf-realiz-usuario.tsx/tabela";
import TransBotao from "../components/transf-realiz-usuario.tsx/trans-button";

function TransfRealizUsuario() {

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

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  

  // Exemplo de retorno de um elemento JSX
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
    <AdmLeftMenu/>
      <Footer />
      <Box
        sx={{
          ml: isMobile ? "30%" : isTablet ? "27%" : "25%",
          mt: isMobile ? "100px" : isTablet ? "100px" : "120px",
          mr: "3%",
          width: isMobile ? "60%" : isTablet ? "70%" : "70%",
          height: isMobile ? "800px" : isTablet ? "840px" : "480px",
        }}
      >
        <Grid container>
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <ParcTituloTransfUsu />
            <ParcSubtituloTransferir/>
            </Grid>
            <Grid container>              
            </Grid>          
        </Grid>
        <TransBotao/>  

      </Box>
    </ThemeProvider>
    </div>
  );

}

export default TransfRealizUsuario;
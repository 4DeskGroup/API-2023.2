import React from "react";
import Footer from "../components/reusable/Footer";
import { ThemeProvider } from "styled-components";
import {
  Box,
  Container,
  Grid,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import ValorOleoTitulo from "../components/adm-valor-oleo/ValorOleoTitulo";
import ValorOleoBotao from "../components/adm-valor-oleo/ValorOleoBotao";
import AdmLeftMenu from "../components/reusable/adm-left-menu";
import ValorOleoHistorico from "../components/adm-valor-oleo/ValorOleoHistorico";
import ValorOleoQuantidade from "../components/adm-valor-oleo/ValorOleoQuantidade";
import ValorOleoCadastro from "../components/adm-valor-oleo/ValorOleoCadastro";



function AdmValorOleo() {
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
  const [selectedButton, setSelectedButton] = React.useState(
    "Definir valor do óleo"
  );

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AdmLeftMenu />
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
          <Grid container sx={{ display: "flex" }}>
            <Grid item lg={5} md={6} sm={12} xs={12}>
              <ValorOleoTitulo />
            </Grid>

            <Grid item lg={5} md={6} sm={12} xs={12}>
              <ValorOleoBotao 
                    selectedButton={selectedButton}
                    handleButtonClick={handleButtonClick}
                  />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              {selectedButton === "Definir valor do óleo" ? (
                <ValorOleoCadastro />
              ) : (
                <ValorOleoHistorico />
              ) }
            </Grid>


            <Grid item lg={12} md={12} sm={12} xs={12}>
              <ValorOleoQuantidade />
            </Grid>

            
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
}
export default AdmValorOleo;



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
import ParCreditoBotoes from "../components/par-credito-greenneat/par-credito-botoes";
import ParCreditoTitulo from "../components/par-credito-greenneat/par-credito-titulo";
import ParCreditoTotal from "../components/par-credito-greenneat/par-credito-total";
import ParLeftMenu from "../components/reusable/ParLeftMenu";
import ParExtratoReceber from "../components/par-credito-greenneat/par-extrato-receber";
import ParCreditoSubtitulo from "../components/par-credito-greenneat/par-credito-subtitulo";
import ParExtratoTransferir from "../components/par-credito-greenneat/par-extrato-transferir";
import ParCreditoTransferir from "../components/par-credito-greenneat/par-credito-transferir";

function ParCreditoGreenneat() {
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
  const [selectedButton, setSelectedButton] = React.useState(
    "Transferir Greenneats à empresa"
  );

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ParLeftMenu />
        <Footer />
        <Box
          sx={{
            ml: isMobile ? "30%" : isTablet ? "27%" : "25%",
            mt: isMobile ? "100px" : isTablet ? "100px" : "120px",
            mr: "3%",
            width: isMobile ? "60%" : isTablet ? "70%" : "75%",
            height: isMobile ? "800px" : isTablet ? "840px" : "480px",
          }}
        >
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={5} md={12} sm={12} xs={12}>
                <ParCreditoTitulo />
                <ParCreditoSubtitulo />
              </Grid>
    

              <Grid item lg={3} md={12} sm={12} xs={12}>
                <ParCreditoTotal />
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <ParCreditoBotoes
                  selectedButton={selectedButton}
                  handleButtonClick={handleButtonClick}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            {selectedButton === "Greenneats recebidas da empresa" ? (
              <ParExtratoReceber />
            ) : selectedButton === "Transferir Greenneats à empresa" ? (
              <ParCreditoTransferir />
            ) : (
              <ParExtratoTransferir />
            )}
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default ParCreditoGreenneat;

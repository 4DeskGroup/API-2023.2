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
import ParCreditoTransferir from "../components/par-credito-greenneat/par-credito-transferir";
import AdmTituloTransferirGreenneats from "../components/adm-tranferir-greenneats/adm-titulo-tranferir-greenneats";
import AdmTransferirBotoes from "../components/adm-tranferir-greenneats/adm-botoes-trasnferir";
import AdmSubtituloTransferir from "../components/adm-tranferir-greenneats/adm-subtitulo-transferir";
import AdmTransfGreenneatsTransferir from "../components/adm-tranferir-greenneats/adm-transf-greenneat-transferir";
import AdmTransfOleoTransferir from "../components/adm-tranferir-greenneats/adm-transf-oleo-transferir";
import AdmLeftMenu from "../components/reusable/adm-left-menu";
import AdmExtratoTransferir from "../components/adm-tranferir-greenneats/adm-extrato-transferir";

function AdmTransferirGreenneats() {
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
    "Transferir Greenneats"
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
              <AdmTituloTransferirGreenneats />
              <AdmSubtituloTransferir/>
              </Grid>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <AdmTransferirBotoes
                    selectedButton={selectedButton}
                    handleButtonClick={handleButtonClick}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ display: "flex" }}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {selectedButton === "Transferir Greenneats" ? (
                  <AdmTransfGreenneatsTransferir />
                ) : selectedButton === "Transferir Greenneats por óleo" ? (
                  <AdmTransfOleoTransferir />
                ) : (
                  <AdmExtratoTransferir />
                )}
              </Grid>
              </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
}
export default AdmTransferirGreenneats;



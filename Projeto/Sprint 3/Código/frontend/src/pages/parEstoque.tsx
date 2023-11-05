import React from "react";
import ParLeftMenu from "../components/reusable/ParLeftMenu";
import Footer from "../components/reusable/Footer";
import ParEstoqueTitulo from "../components/parEstoque-oleo/titulo";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import ParEstoqueSubTitulo from "../components/parEstoque-oleo/subtitulo";
import ParEstoqueQuantidade from "../components/parEstoque-oleo/quantidade";
import ParEstoqueHistorico from "../components/parEstoque-oleo/historico";

function EstoqueParceiro() {
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
  const isDesktop = useMediaQuery("(max-width: 10025px)"); // Tela maior que 1024px é considerada como PC
  const [selectedButton, setSelectedButton] = React.useState("Transação");

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };
  return (
    <div className="App">
      <ParLeftMenu />
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
            <ParEstoqueTitulo />
            <ParEstoqueSubTitulo />
            {/* <EstEstoqueBotao
              selectedButton={selectedButton}
              handleButtonClick={handleButtonClick}
            /> */}
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <ParEstoqueQuantidade />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ParEstoqueHistorico />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default EstoqueParceiro;

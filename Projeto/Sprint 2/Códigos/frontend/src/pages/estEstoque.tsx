import React from "react";
import EstLeftMenu from "../components/reusable/EstLeftMenu";
import TopMenu from "../components/reusable/TopMenu";
import Footer from "../components/reusable/Footer";
import EstEstoqueTitulo from "../components/estEstoque-oleo/titulo";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import EstEstoqueSubTitulo from "../components/estEstoque-oleo/subtitulo";
import EstEstoqueBotao from "../components/estEstoque-oleo/botao";
import EstEstoqueQuantidade from "../components/estEstoque-oleo/quantidade";
import EstEstoqueCadastro from "../components/estEstoque-oleo/cadastro";
import EstEstoqueHistorico from "../components/estEstoque-oleo/historico";

function EstoqueEstabelecimento() {
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
      <EstLeftMenu />
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
            <EstEstoqueTitulo />
            <EstEstoqueSubTitulo />
            <EstEstoqueBotao
              selectedButton={selectedButton}
              handleButtonClick={handleButtonClick}
            />
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <EstEstoqueQuantidade />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {selectedButton === "Transação" ? (
              <EstEstoqueCadastro />
            ) : (
              <EstEstoqueHistorico />
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default EstoqueEstabelecimento;

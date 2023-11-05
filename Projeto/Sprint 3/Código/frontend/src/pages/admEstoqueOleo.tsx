import React from "react";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import AdmLeftMenu from "../components/reusable/adm-left-menu";
import Footer from "../components/reusable/Footer";
import Titulo from "../components/admEstoque/titulo";
import Subtitulo from "../components/admEstoque/subtitulo";
import Quantidade from "../components/admEstoque/quantidade";
import Historico from "../components/admEstoque/historico";

function AdmEstoqueOleo(){
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

      return( <div className="App">
      <ThemeProvider theme={theme}>
        <AdmLeftMenu/>
        <Titulo />
        <Subtitulo />
        <Quantidade />
        <Historico />
        <Footer />
      </ThemeProvider>
    </div>
    );

}
export default AdmEstoqueOleo;

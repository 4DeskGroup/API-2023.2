import React from "react";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import AdmLeftMenu from "../components/reusable/adm-left-menu";
import Footer from "../components/reusable/Footer";
import Titulo from "../components/adm-hist-rec-usu/titulo";
import Historico from "../components/adm-hist-rec-usu/historico";
import Subtitulo from "../components/adm-hist-rec-usu/subtitulo";
import BarraPesquisa from "../components/adm-hist-rec-usu/barraPesquisa";

function AdmHistoricoRecUsu(){
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
        <Historico />
        <Footer />
      </ThemeProvider>
    </div>
    );

}
export default AdmHistoricoRecUsu;

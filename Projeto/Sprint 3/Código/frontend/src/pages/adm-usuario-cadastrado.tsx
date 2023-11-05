import React, { useEffect, useState } from "react";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import AdmLeftMenu from "../components/reusable/adm-left-menu";
import Footer from "../components/reusable/Footer";
import Titulo from "../components/admUserCadastrado/adm-titulo-usuario";
import Subtitulo from "../components/admUserCadastrado/adm-subtitulo-usuario";
import BarraPesquisa from "../components/admUserCadastrado/adm-barrapesquisa-use";
import Botoes from "../components/admUserCadastrado/adm-botoes-usuario";
import AdmUsuarioHistorico from "../components/admUserCadastrado/adm-histor-usuario";

function AdmUsuarioCadastrado() {
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

  return (<div className="App">
    <ThemeProvider theme={theme}>
      <AdmLeftMenu />
      <Titulo />
      <Subtitulo />
      {/* <Botoes /> */}
      {/* <BarraPesquisa /> */}
      <AdmUsuarioHistorico />
      <Footer />

    </ThemeProvider>
  </div>
  );

}
export default AdmUsuarioCadastrado;
import React from "react";
import Footer from "../components/reusable/Footer";
import TopMenu from "../components/reusable/TopMenu";
import { ThemeProvider, createTheme } from "@mui/material";
import Step3Estab from "../components/EdicaoUsuario/step3Estab";


function EstEdicaoUsuario() {
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
    <div className="App">
      <ThemeProvider theme={theme}>
        <TopMenu />
        <Step3Estab />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default EstEdicaoUsuario;

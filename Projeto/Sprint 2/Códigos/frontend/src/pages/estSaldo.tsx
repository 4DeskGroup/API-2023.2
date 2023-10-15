import React from "react";
import BottomNav from "../components/reusable/menuantigo";
import Footer from "../components/reusable/Footer";
import EstSaldoMoney from "../components/estSaldo/EstSaldoMoney";
import EstSaldoComponent from "../components/estSaldo/EstSaldoComponent";
import EstSaldoBotao from "../components/estSaldo/EstSaldoBotao";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";
import EstLeftMenu from "../components/reusable/EstLeftMenu";
// import EstTransacao from '../components/estSaldo/EstTransacao';
// import EstExtrato from '../components/estSaldo/EstExtrato';

function Estabelecimento() {
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
        <EstLeftMenu />
        <Footer />
        <EstSaldoBotao />
        <EstSaldoComponent />
        <EstSaldoMoney />
      </ThemeProvider>
    </div>
  );
}

export default Estabelecimento;

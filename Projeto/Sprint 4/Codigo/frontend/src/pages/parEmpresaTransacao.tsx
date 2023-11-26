import React from "react";
import BottomNav from "../components/reusable/menuantigo";
import { ThemeProvider, createTheme } from "@mui/material";
import Footer from "../components/reusable/Footer";
import ParEmpSaldoBotao from "../components/parEmpresaTransacao/ParEmpSaldoBotao";
import ParEmpSaldoComponent from "../components/parEmpresaTransacao/ParEmpSaldoComponent";
import ParEmpSaldoMoney from "../components/parEmpresaTransacao/ParEmpSaldoMoney";
import ParLeftMenu from "../components/reusable/ParLeftMenu";
import ParEstoqueQuantidade from "../components/parEstoque-oleo/quantidade";
// import ParTransacao from '../components/parSaldo/ParTransacao';
// import ParExtrato from '../components/parSaldo/ParExtrato';

function ParEmpresaTransacao() {
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
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <BottomNav /> */}
        <ParLeftMenu />
        <Footer />
        {/* <ParNestedList /> */}
        <ParEmpSaldoBotao />
        
        <ParEmpSaldoComponent />
        <ParEmpSaldoMoney />
      </div>
    </ThemeProvider>
  );
}

export default ParEmpresaTransacao;

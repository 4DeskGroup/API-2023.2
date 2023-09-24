import React from 'react';
import BottomNav from '../components/reusable/BottomNav';
import { ThemeProvider, createTheme } from '@mui/material';
import Footer from '../components/reusable/Footer';
import ParNestedList from '../components/reusable/ParNestedList';
import ParSaldoBotao from '../components/parSaldo/ParSaldoBotao';
import ParSaldoComponent from '../components/parSaldo/ParSaldoComponent';
import ParSaldoMoney from '../components/parSaldo/ParSaldoMoney';
// import ParTransacao from '../components/parSaldo/ParTransacao';
// import ParExtrato from '../components/parSaldo/ParExtrato';


function ParSaldo() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#136935',
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BottomNav />
        <Footer />
        <ParNestedList />
        <ParSaldoBotao />
        <ParSaldoComponent />
        <ParSaldoMoney />
      </div>
    </ThemeProvider >

    
  );
}

export default ParSaldo;

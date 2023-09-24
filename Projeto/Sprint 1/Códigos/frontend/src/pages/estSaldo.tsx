import React from 'react';
import EstNestedList from '../components/reusable/EstNestedList'
import BottomNav from '../components/reusable/BottomNav';
import Footer from '../components/reusable/Footer';
import EstSaldoMoney from '../components/estSaldo/EstSaldoMoney';
import EstSaldoComponent from '../components/estSaldo/EstSaldoComponent';
import EstSaldoBotao from '../components/estSaldo/EstSaldoBotao';
// import EstTransacao from '../components/estSaldo/EstTransacao';
// import EstExtrato from '../components/estSaldo/EstExtrato';



function Estabelecimento() {
  return (
    <div className="App">
      <BottomNav />
      <Footer />
      <EstNestedList />
      <EstSaldoBotao />
      <EstSaldoComponent />
      <EstSaldoMoney />
    </div>
  );
}

export default Estabelecimento;

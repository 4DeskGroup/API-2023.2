import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LendingPage from "../pages/lendingpage";
import ParSaldo from "../pages/parSaldo";
import EstSaldo from "../pages/estSaldo";
import Registration from "../pages/registration";
import { BrowserRouter } from "react-router-dom";
import EstoqueEstabelecimento from "../pages/estEstoque";
import Erro404 from "../pages/erro404";
import EstoqueParceiro from "../pages/parEstoque";
import ParEmpresaTransacao from "../pages/parEmpresaTransacao";
import { PrivateRouteParceiro, PrivateRouteEstabelecimento } from "./authentication";

export const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LendingPage />} />

        <Route path="/estabelecimento-saldo"
          element={
            <PrivateRouteEstabelecimento>
              <EstSaldo />
            </PrivateRouteEstabelecimento>
          } />

        <Route path="/parceiro-saldo"
          element={
            <PrivateRouteParceiro>
              <ParSaldo />
            </PrivateRouteParceiro>

          } />

        <Route path="/registration" element={<Registration />} />
        
        <Route path="/estabelecimento-estoque"
          element={
            <PrivateRouteEstabelecimento>
              <EstoqueEstabelecimento />
            </PrivateRouteEstabelecimento>
          } />

        <Route path="/parceiro-estoque"
          element={
            <PrivateRouteParceiro>
              <EstoqueParceiro />
            </PrivateRouteParceiro>

          } />

        <Route path="/parceiro-empresa-transacao"
          element={
            <PrivateRouteParceiro>
              <ParEmpresaTransacao />
            </PrivateRouteParceiro>
          } />

        <Route path="*" element={<Erro404 />} />

      </Routes>
    </BrowserRouter>
  );
};

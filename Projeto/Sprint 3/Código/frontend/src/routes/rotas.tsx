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
import { PrivateRouteParceiro, PrivateRouteEstabelecimento, PrivateRouteADM } from "./authentication";
import ParEdicaoPerfil from "../pages/parEdicaoPerfil";
import EstEdicaoUsuario from "../pages/estEdicaoUsuario";
import AdmTransferirGreenneats from "../pages/adm-tranferir-greenneats";
import ParCreditoGreenneat from "../pages/par-credito-greenneat";
import AdmEstoqueOleo from "../pages/admEstoqueOleo";
import AdmHistoricoRecUsu from "../pages/adm-historicoRecUsu";
import AdmUsuarioCadastrado from "../pages/adm-usuario-cadastrado";
import TransfRealizUsuario from "../pages/transf-realiz-usuario";

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

        <Route path="/adm-transferir-greenneats"
          element={
            <PrivateRouteADM>
              <AdmTransferirGreenneats />
            </PrivateRouteADM>
          } />

        <Route path="/adm-estoque-oleo"
          element={
            <PrivateRouteADM>
              <AdmEstoqueOleo />
            </PrivateRouteADM>
          } />

        <Route path="/adm-historico-rec-user"
          element={
            <PrivateRouteADM>
              <AdmHistoricoRecUsu />
            </PrivateRouteADM>
          } />

        <Route path="/adm-usuarios-cadastrados"
          element={
            <PrivateRouteADM>
              <AdmUsuarioCadastrado />
            </PrivateRouteADM>
          } />

        <Route path="/par-credito-greenneat"
          element={
            <PrivateRouteParceiro>
              <ParCreditoGreenneat />
            </PrivateRouteParceiro>
          } />

<Route path="/transf-realiz-usuario"
          element={
            <PrivateRouteADM>
              <TransfRealizUsuario />
            </PrivateRouteADM>
          } />

        <Route path="/edicao-usuario-parceiro" element={<ParEdicaoPerfil />} />
        <Route path="/edicao-usuario-estabelecimento" element={<EstEdicaoUsuario />} />
        <Route path="*" element={<Erro404 />} />

      </Routes>
    </BrowserRouter>
  );
};

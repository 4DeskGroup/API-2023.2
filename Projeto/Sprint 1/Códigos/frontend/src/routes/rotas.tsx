import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LendingPage from "../pages/lendingpage";
import Estabelecimento from "../pages/estSaldo";
import ParSaldo from "../pages/parSaldo";
import EstSaldo from "../pages/estSaldo"
import Registration from "../pages/registration";
import { BrowserRouter } from "react-router-dom";

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LendingPage />} />
                <Route path="/estabelecimento" element={<Estabelecimento />} />
                <Route path="/par-saldo" element={<ParSaldo />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="*" element={<h1>PÁGINA NÃO ENCONTRADA</h1>}/>
            </Routes>
        </BrowserRouter>
    );
};

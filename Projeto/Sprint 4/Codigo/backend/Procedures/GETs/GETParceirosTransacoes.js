export async function GETListaParceiroTransacoes(client) {
    try {
        const SQL = "SELECT TE.TransacaoEstabelecimentoParceiroData AS Data_Transacao, P1.ParceiroNomeFantasia AS Parceiro_Que_Transferiu, E1.EstabelecimentoNomeFantasia AS Estabelecimento_Que_Recebeu, CAST(TE.EstabelecimentoEstoqueProdutoQuantidade AS VARCHAR) AS Total_Litros_Oleo,TE.ParceiroCreditoQuantidade AS Total_Moedas_Transferidas FROM TransacaoEstabelecimentoParceiro TE JOIN Parceiro P1 ON TE.ParceiroID = P1.ParceiroID JOIN EstabelecimentoEstoque EE ON TE.EstabelecimentoEstoqueID = EE.EstabelecimentoEstoqueID JOIN Estabelecimento E1 ON EE.EstabelecimentoID = E1.EstabelecimentoID UNION ALL SELECT HPE.HistoricoParceiroEmpresaData AS Data_Transacao, P2.ParceiroNomeFantasia AS Parceiro_Que_Transferiu, 'Empresa' AS Empresa_Que_Recebeu, '-' AS Total_Litros_Oleo, HPE.HistoricoParceiroEmpresaCreditoQuantidade AS Total_Moedas_Transferidas FROM HistoricoParceiroEmpresa HPE JOIN Parceiro P2 ON HPE.ParceiroID = P2.ParceiroID ORDER BY Data_Transacao DESC;"
        const result = await client.query(SQL);

        if (result.rows.length > 0) {
            const parceiros = result.rows.map(row => ({
                Data_Transacao: row.data_transacao, 
                Parceiro_Que_Transferiu: row.parceiro_que_transferiu,
                Estabelecimento_Que_Recebeu: row.estabelecimento_que_recebeu,
                Total_Litros_Oleo: row.total_litros_oleo,
                Total_Moedas_Transferidas: row.total_moedas_transferidas
            }));

            return parceiros;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function GETListaEstabelecimentosTransacoes(client) {
    try {
        const SQL = `SELECT
        TE.TransacaoEstabelecimentoEmpresaData AS Data_Transacao,
        E.EstabelecimentoNomeFantasia AS Estabelecimento_Que_Transferiu,
        Emp.EmpresaNomeFantasia AS Empresa_Que_Recebeu,
        TE.TransacaoEstabelecimentoEmpresaCreditos AS Total_Moedas_Transferidas
    FROM
        TransacaoEstabelecimentoEmpresa TE
    JOIN
        Estabelecimento E ON TE.EstabelecimentoID = E.EstabelecimentoID
    JOIN
        Empresa Emp ON TE.EmpresaID = Emp.EmpresaID
    ORDER BY
        Data_Transacao DESC; `
        const result = await client.query(SQL);
        if (result.rows.length > 0) {
            const transacoes = result.rows.map(row => ({
                Data_Transacao: row.data_transacao,
                Estabelecimento_Que_Transferiu: row.estabelecimento_que_transferiu,
                Empresa_Que_Recebeu: row.empresa_que_recebeu,
                Total_Moedas_Transferidas: row.total_moedas_transferidas
            }));

            return transacoes;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const { Pool } = require('pg');

export async function POSTEnviarMoedaParceiroEmpresa(client, EmpresaNome, historicoParceiroEmpresaObj, usuarioID) {
    try {
        const parceiroQuery = 'SELECT ParceiroCreditoQuantidade, ParceiroID FROM Parceiro WHERE UsuarioID = $1';
        const resultGET = await client.query(parceiroQuery, [usuarioID]);
        const { parceirocreditoquantidade, parceiroid } = resultGET.rows[0];

        const empresaGETquery = 'SELECT EmpresaID FROM Empresa WHERE empresanomefantasia = $1';
        const resultEmpresaget = await client.query(empresaGETquery, [EmpresaNome]);
        const { empresaid } = resultEmpresaget.rows[0];

        if (resultGET.rows.length === 1) {
            const creditoAtual = parceirocreditoquantidade;
            const creditoRequerido = historicoParceiroEmpresaObj.HistoricoParceiroEmpresaCreditoQuantidade;

            if (creditoAtual >= creditoRequerido) {
                const novoCredito = creditoAtual - creditoRequerido;

                // Realizar a atualização do crédito
                const updateQuery = 'UPDATE Parceiro SET ParceiroCreditoQuantidade = $1 WHERE UsuarioID = $2';
                const updateValues = [novoCredito, usuarioID];
                await client.query(updateQuery, updateValues);

                const insertResult = await funcaoInsertTabela(client, historicoParceiroEmpresaObj, parceiroid, empresaid);
                return insertResult;
            } else {
                return { isSucesso: false, mensagem: 'Créditos insuficientes' };
            }
        } else {
            throw new Error('Parceiro não encontrado');
        }
    } catch (error) {
        return { isSucesso: false, mensagem: `Erro ao executar a operação: ${error.message}` };
    }
}

const funcaoInsertTabela = async (client, historicoParceiroEmpresaObj, parceiroid, empresaid) => {
    const insertQuery = `
    INSERT INTO HistoricoParceiroEmpresa (
      EmpresaID,
      ParceiroID,
      HistoricoParceiroEmpresaData,
      HistoricoParceiroEmpresaDescricao,
      HistoricoParceiroEmpresaCreditoQuantidade,
      HistoricoParceiroEmpresaTipoTransacao
    )
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

    const insertValues = [
        empresaid,
        parceiroid,
        historicoParceiroEmpresaObj.HistoricoParceiroEmpresaData,
        historicoParceiroEmpresaObj.HistoricoParceiroEmpresaDescricao,
        historicoParceiroEmpresaObj.HistoricoParceiroEmpresaCreditoQuantidade,
        historicoParceiroEmpresaObj.HistoricoParceiroEmpresaTipoTransacao,
    ];

    try {
        await client.query(insertQuery, insertValues);
        return { isSucesso: true, mensagem: 'Operação concluída com sucesso' };
    } catch (error) {
        return { isSucesso: false, mensagem: `Erro ao executar a operação: ${error.message}` };
    }
}

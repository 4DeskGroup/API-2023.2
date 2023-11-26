const { Pool } = require('pg');

export async function POSTEmpresaEnviarMoedaParceiro(client, ParceiroNome, historicoParceiroEmpresaObj, usuarioID) {
    try {

        // console.log(JSON.stringify(historicoParceiroEmpresaObj));
        // console.log(ParceiroNome);

        const parceiroQuery = 'SELECT ParceiroCreditoQuantidade, ParceiroID FROM Parceiro WHERE parceironomefantasia = $1';
        const resultGET = await client.query(parceiroQuery, [ParceiroNome]);
        const { parceirocreditoquantidade, parceiroid } = resultGET.rows[0];
        // console.log('parceirocreditoquantidade:  '+ parceirocreditoquantidade);
        // console.log('parceiroid:  '+ parceiroid);

        const empresaGETquery = 'SELECT EmpresaID FROM Empresa WHERE UsuarioID = $1';
        const resultEmpresaget = await client.query(empresaGETquery, [usuarioID]);
        const { empresaid } = resultEmpresaget.rows[0];

        if (resultGET.rows.length === 1) {
            const creditoAtual = parceirocreditoquantidade;
            const creditoRequerido = historicoParceiroEmpresaObj.CreditoQuantidade;

            const novoCredito = parseFloat(creditoAtual) + parseFloat(creditoRequerido);

            // Realizar a atualização do crédito
            const updateQuery = 'UPDATE Parceiro SET ParceiroCreditoQuantidade = $1 WHERE ParceiroID = $2';
            const updateValues = [novoCredito, parceiroid];
            await client.query(updateQuery, updateValues);

            const insertResult = await funcaoInsertTabela(client, historicoParceiroEmpresaObj, parceiroid, empresaid);
            return insertResult;

        } else {
            throw new Error('Empresa não encontrada.');
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
        historicoParceiroEmpresaObj.Data,
        historicoParceiroEmpresaObj.Descricao,
        historicoParceiroEmpresaObj.CreditoQuantidade,
        historicoParceiroEmpresaObj.TipoTransacao,
    ];

    try {
        await client.query(insertQuery, insertValues);
        return { isSucesso: true, mensagem: 'Operação concluída com sucesso' };
    } catch (error) {
        return { isSucesso: false, mensagem: `Erro ao executar a operação: ${error.message}` };
    }
}

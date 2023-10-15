const { Client } = require('pg');

export async function POSTEstabelecimentoEmpresa(client, EmpresaNome, UsuarioID, transacao) {

    const resultado = {
        IsSucesso: false,
        mensagensSucesso: '',
        mensagensErro: '',
    };

    // client.connect();

    try {
        // Obter o EstabelecimentoID com base no UsuarioID
        var LocalERRO = 'SELECT empresa'
        const empresaidQuery = {
            text: 'SELECT EmpresaID from Empresa where EmpresaNomeFantasia = $1',
            values: [EmpresaNome],
        };
        const resultEmpresaID = await client.query(empresaidQuery);
        const { empresaid } = resultEmpresaID.rows[0];
        // EmpresaID = empresaid

        LocalERRO = 'SELECT Estab'
        const estabelecimentoQuery = {
            text: 'SELECT EstabelecimentoID, EstabelecimentoCreditoQuantidade FROM Estabelecimento WHERE UsuarioID = $1',
            values: [UsuarioID],
        };
        const result = await client.query(estabelecimentoQuery);
        const { estabelecimentoid, estabelecimentocreditoquantidade } = result.rows[0];

        // Verificar se a quantidade a ser retirada está disponível

        if (transacao.TransacaoEstabelecimentoEmpresaQuantidade > estabelecimentocreditoquantidade) {
            resultado.mensagensErro = 'Quantidade insuficiente de créditos no estabelecimento.'
            return resultado;
        }

        // Atualizar a Empresa para adicionar créditos e diminuir a quantidade de créditos
        LocalERRO = 'UPD Empresa'
        const updateEmpresaQuery = `
      UPDATE Empresa
      SET EmpresaCreditos = EmpresaCreditos + $1
      WHERE EmpresaID = $2`;
        const updateEmpresaValues = [transacao.TransacaoEstabelecimentoEmpresaCreditos, empresaid];
        await client.query(updateEmpresaQuery, updateEmpresaValues);
        resultado.mensagensSucesso = 'Créditos da empresa atualizados com sucesso.'

        // Atualizar a tabela de Estabelecimento para deduzir a quantidade
        LocalERRO = 'UPD Estab'
        const updateEstabelecimentoQuery = `
      UPDATE Estabelecimento
      SET EstabelecimentoCreditoQuantidade = EstabelecimentoCreditoQuantidade - $1
      WHERE EstabelecimentoID = $2`;
        const updateEstabelecimentoValues = [transacao.TransacaoEstabelecimentoEmpresaQuantidade, estabelecimentoid];
        await client.query(updateEstabelecimentoQuery, updateEstabelecimentoValues);
        resultado.mensagensSucesso = 'Quantidade de créditos do estabelecimento atualizada com sucesso.'

        // Inserir informações na tabela TransacaoEstabelecimentoEmpresaCreditos
        LocalERRO = 'Insert TRN'
        const insertTransacaoQuery = `
      INSERT INTO TransacaoEstabelecimentoEmpresa
      (EmpresaID, EstabelecimentoID, TransacaoEstabelecimentoEmpresaCreditos , TransacaoEstabelecimentoEmpresaDescricao, TransacaoEstabelecimentoEmpresaData)
      VALUES ($1, $2, $3, $4, $5)`;
        const insertTransacaoValues = [
            empresaid,
            estabelecimentoid,
            transacao.TransacaoEstabelecimentoEmpresaQuantidade,
            transacao.TransacaoEstabelecimentoEmpresaDescricao,
            transacao.TransacaoEstabelecimentoEmpresaData
        ];
        await client.query(insertTransacaoQuery, insertTransacaoValues);
        resultado.mensagensSucesso = 'Transação registrada com sucesso.'

        resultado.IsSucesso = true;
        return resultado;
    } catch (error) {
        resultado.mensagensErro = `Erro ao processar a transação: ${error.message}` + LocalERRO
        return resultado;
    }
}
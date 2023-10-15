import { GETEstabelecimentoEstoqueByUsuarioID } from '../GETs/GETEstabelecimentoEstoqueByUsuarioID';

const { Client } = require('pg');

export async function processarEstoque(client, usuarioID, estabelecimentoEstoqueDBJson) {
  let LocalERRO = 'GETEstabelecimento';
  let isSucesso = true;  // Adicionada a variável isSucesso

  try {
    // await client.connect();

    let estabelecimentoEstoque = [];
    const estabelecimentoEstoqueJson = ''
    
    await GETEstabelecimentoEstoqueByUsuarioID(client, usuarioID).then(estoque => {
     estabelecimentoEstoqueJson = JSON.stringify(estoque)
  })
  .catch(error => console.error('Erro ao obter o estoque:', error));

    if (estabelecimentoEstoqueJson) {
      estabelecimentoEstoque = JSON.parse(estabelecimentoEstoqueJson);
    }

    const estabelecimentoEstoqueDB = JSON.parse(estabelecimentoEstoqueDBJson);

    // console.log('estabelecimentoEstoqueJson:', estabelecimentoEstoque);
    // console.log('estabelecimentoEstoqueDB:', estabelecimentoEstoqueDB);

    const estabelecimentoQuery = {
      text: 'SELECT EstabelecimentoID FROM Estabelecimento WHERE UsuarioID = $1',
      values: [usuarioID],
    };

    const estabelecimentoResult = await client.query(estabelecimentoQuery);

    if (estabelecimentoResult.rows.length === 0) {
      console.error('Nenhum estabelecimento encontrado para o usuário com ID:', usuarioID);
      return { isSucesso: false };  // ou lançar um erro, dependendo da lógica desejada
    }

    const EstabelecimentoID = estabelecimentoResult.rows[0].estabelecimentoid;

    if (estabelecimentoEstoque.length === 0) {
      // estabelecimentoEstoqueJson is empty, perform an insert
      for (const estoqueDB of estabelecimentoEstoqueDB) {
        if(estoqueDB.estabelecimentoestoqueprodutoquantidade === null){estoqueDB.estabelecimentoestoqueprodutoquantidade = 0}

        LocalERRO = 'INSERT';
        const insertQuery = `
          INSERT INTO EstabelecimentoEstoque 
          (EstabelecimentoID, EstabelecimentoEstoqueProdutoDescricao, EstabelecimentoEstoqueTipo, EstabelecimentoEstoqueProdutoQuantidade)
          VALUES ($1, $2, $3, $4) RETURNING EstabelecimentoEstoqueID`;

        const result = await client.query(insertQuery, [EstabelecimentoID, estoqueDB.estabelecimentoestoqueprodutodescricao, estoqueDB.estabelecimentoestoquetipo, estoqueDB.estabelecimentoestoqueprodutoquantidade]);

        const estabelecimentoEstoqueID = result.rows[0].estabelecimentoestoqueid;
        // console.log('DENTRO ELSE - EstabelecimentoEstoqueID:  ' + estabelecimentoEstoqueID);
        if (estoqueDB.estabelecimentoestoqueprodutoquantidade > 0) {
          const historicoEstabelecimentoEstoqueID = await adicionarRegistroHistorico(client, estabelecimentoEstoqueID, EstabelecimentoID, estoqueDB.estabelecimentoestoqueprodutodescricao, estoqueDB.estabelecimentoestoquetipo, estoqueDB.estabelecimentoestoqueprodutoquantidade);
          // console.log('HistoricoEstabelecimentoEstoqueID:', historicoEstabelecimentoEstoqueID);
        }
      }
    } else {
      // estabelecimentoEstoqueJson is populated, perform an update
      for (const estoqueJson of estabelecimentoEstoque) {
        const estoqueDB = estabelecimentoEstoqueDB.find(item => item.estabelecimentoestoquetipo === estoqueJson.estabelecimentoestoquetipo);

        // console.log('DENTRO DO IF ESTOQUEDB: ' + JSON.stringify(estoqueDB));

        if (estoqueDB) {
          // Ensure that the values are valid numbers before performing the update
          const quantidadeEstoqueJson = parseFloat(estoqueJson.estabelecimentoestoqueprodutoquantidade) || 0;
          const quantidadeEstoqueDB = parseFloat(estoqueDB.estabelecimentoestoqueprodutoquantidade) || 0;

          const QuantidadeSoma = quantidadeEstoqueJson + quantidadeEstoqueDB;
          // console.log('QuantidadeSoma:  ' + QuantidadeSoma);
          LocalERRO = 'UPDATE';
          const updateQuery = `
            UPDATE EstabelecimentoEstoque 
            SET EstabelecimentoEstoqueProdutoQuantidade = $1 
            WHERE EstabelecimentoEstoqueID = $2 `;
          await client.query(updateQuery, [QuantidadeSoma, estoqueJson.estabelecimentoestoqueid]);

          if (quantidadeEstoqueDB > 0) {
            const historicoEstabelecimentoEstoqueID = await adicionarRegistroHistorico(client, estoqueJson.estabelecimentoestoqueid, EstabelecimentoID, estoqueJson.estabelecimentoestoqueprodutodescricao, estoqueJson.estabelecimentoestoquetipo, quantidadeEstoqueDB);
            // console.log('HistoricoEstabelecimentoEstoqueID:', historicoEstabelecimentoEstoqueID);
          }
        }
      }
    }
  } catch (error) {
    console.error('Erro ao processar o estoque:', error + LocalERRO);
    isSucesso = false;
  }
  return { isSucesso };
}

async function adicionarRegistroHistorico(client, EstabelecimentoEstoqueID, EstabelecimentoID, ProdutoDescricao, EstoqueTipo, ProdutoQuantidade) {
  let LocalERRO = 'INSERT HistoricoEstabelecimentoEstoque';

  try {
    const historicoEstabelecimentoEstoqueData = new Date().toLocaleString();
    const insertHistoricoQuery = `
      INSERT INTO HistoricoEstabelecimentoEstoque 
      (EstabelecimentoEstoqueID, EstabelecimentoID, HistoricoEstabelecimentoEstoqueData, EstabelecimentoEstoqueProdutoDescricao, EstabelecimentoEstoqueTipo, EstabelecimentoEstoqueProdutoQuantidade)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING HistoricoEstabelecimentoEstoqueID`;

    const result = await client.query(insertHistoricoQuery, [EstabelecimentoEstoqueID, EstabelecimentoID, historicoEstabelecimentoEstoqueData, ProdutoDescricao, EstoqueTipo, ProdutoQuantidade]);

    const rows = result.rows;
    if (rows && rows.length > 0) {
      const historicoEstabelecimentoEstoqueID = rows[0].historicoestabelecimentoestoqueid;
      return historicoEstabelecimentoEstoqueID;
    } else {
      console.error('Nenhum resultado retornado ao adicionar registro no histórico.');
      return null; // Retorna null ou outra indicação de ausência de resultado
    }
  } catch (error) {
    console.error('Erro ao adicionar registro no histórico:', error + LocalERRO);
    throw error;
  }
}

const { Client } = require('pg');

export async function GETListaParceiroEstoque(client, UsuarioID) {
  // await client.connect();

  try {
    let isSucesso = false;
    let retornoEstabEstoque = [];

    const parceiroEstoqueQuery = 'SELECT * FROM parceiroEstoque WHERE parceiroID IN (SELECT parceiroID FROM parceiro WHERE UsuarioID = $1);';

    const values = [UsuarioID];

    const parceiroEstoqueResult = await client.query(parceiroEstoqueQuery, values);

    if (parceiroEstoqueResult.rows.length > 0) {
      for (const row of parceiroEstoqueResult.rows) {
        const parceiroEstoque = {
          parceiroEstoqueID: row.parceiroestoqueid,
          parceiroID: row.parceiroid,
          parceiroEstoqueProdutoDescricao: row.parceiroestoqueprodutodescricao,
          parceiroEstoqueTipo: row.parceiroestoquetipo,
          parceiroEstoqueProdutoQuantidade: row.parceiroestoqueprodutoquantidade
        };
        retornoEstabEstoque.push(parceiroEstoque);
      }

      isSucesso = true;
    }
    const retornoEstabEstoqueJSON = JSON.stringify(retornoEstabEstoque)
    return { isSucesso, retornoEstabEstoqueJSON };
  } catch (error) {
    console.error('Erro ao obter o parceiroEstoque:', error);
    throw error; // Você pode tratar o erro conforme necessário ou relançá-lo
  } 
}

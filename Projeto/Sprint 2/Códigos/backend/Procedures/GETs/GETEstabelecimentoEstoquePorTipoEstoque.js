const { Client } = require('pg');

export async function GETEstabelecimentoEstoquePorTipo(client, EstabelecimentoID, EstoqueTipo) {
  // await client.connect();

  try {

    let isSucesso = false
    let retornoEstabEstoque = null
    // let retornoEstabEstoque = []

    const estabelecimentoEstoqueQuery = 'SELECT * FROM EstabelecimentoEstoque WHERE EstabelecimentoID = $1 AND EstabelecimentoEstoqueTipo = $2'

    const values = [EstabelecimentoID, EstoqueTipo]

    const estabelecimentoEstoqueResult = await client.query(estabelecimentoEstoqueQuery, values);
    console.log(estabelecimentoEstoqueResult.rows[0])

    if (estabelecimentoEstoqueResult.rows.length > 0) {
      const estabEstoqueEncontrado = estabelecimentoEstoqueResult.rows[0]

      retornoEstabEstoque = {
        EstabelecimentoEstoqueID: estabEstoqueEncontrado.estabelecimentoestoqueid,
        EstabelecimentoID: estabEstoqueEncontrado.estabelecimentoid,
        EstabelecimentoEstoqueProdutoDescricao: estabEstoqueEncontrado.estabelecimentoestoqueprodutodescricao,
        EstabelecimentoEstoqueTipo: estabEstoqueEncontrado.estabelecimentoestoquetipo,
        EstabelecimentoEstoqueProdutoQuantidade: estabEstoqueEncontrado.estabelecimentoestoqueprodutoquantidade
      }
      // for (const estabEstoqueEncontrado of estabelecimentoEstoqueResult.rows) {
      //   const estabEstoque = {
      //     EstabelecimentoEstoqueID: estabEstoqueEncontrado.estabelecimentoestoqueid,
      //     EstabelecimentoID: estabEstoqueEncontrado.estabelecimentoid,
      //     EstabelecimentoEstoqueProdutoDescricao: estabEstoqueEncontrado.estabelecimentoestoqueprodutodescricao,
      //     EstabelecimentoEstoqueTipo: estabEstoqueEncontrado.estabelecimentoestoquetipo,
      //     EstabelecimentoEstoqueProdutoQuantidade: estabEstoqueEncontrado.estabelecimentoestoqueprodutoquantidade
      //   };
      //   retornoEstabEstoque.push(estabEstoque);
      // }

      isSucesso = true
      return { isSucesso, retornoEstabEstoque }
    }
  } catch (error) {
    console.error('Erro ao obter o EstabelecimentoEstoque:', error);
    throw error; // Você pode tratar o erro conforme necessário ou relançá-lo
  } //finally {
  //   await client.end();
  // }
}

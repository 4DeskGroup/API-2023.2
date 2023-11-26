const { Client } = require('pg');

export async function GETParceiroEstoquePorTipo(client, ParceiroNomeFantasia, EstoqueTipo) {
  // await client.connect();

  try {

    let isSucesso = false
    let retornoParcEstoque = null
    // let retornoEstabEstoque = []
    const estabelecimentoEstoqueQuery = 'select * from ParceiroEstoque pe left join parceiro p on pe.parceiroid = p.parceiroid where pe.parceiroestoquetipo = $1 and p.parceironomefantasia = $2'
    const values = [EstoqueTipo, ParceiroNomeFantasia]

    const estabelecimentoEstoqueResult = await client.query(estabelecimentoEstoqueQuery, values);

    if (estabelecimentoEstoqueResult.rows.length > 0) {
      const parceiroestoqueencontrado = estabelecimentoEstoqueResult.rows[0]

      retornoParcEstoque = {
        ParceiroEstoqueID: parceiroestoqueencontrado.parceiroestoqueid,
        ParceiroID: parceiroestoqueencontrado.parceiroid,
        ParceiroEstoqueProdutoDescricao: parceiroestoqueencontrado.parceiroestoqueprodutodescricao,
        ParceiroEstoqueTipo: parceiroestoqueencontrado.parceiroestoquetipo,
        ParceiroEstoqueProdutoQuantidade: parceiroestoqueencontrado.parceiroestoqueprodutoquantidade
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
      return { isSucesso, retornoParcEstoque }
    }
  } catch (error) {
    console.error('Erro ao obter o ParceiroEstoque:', error);
    throw error; // Você pode tratar o erro conforme necessário ou relançá-lo
  } //finally {
  //   await client.end();
  // }
}

const { Client } = require("pg");

export async function GETParceiroEstoqueHistorico(client, usuarioID) {
  await client.connect();
  const query = `
  SELECT
  tep.transacaoestabelecimentoparceirodata AS data_transacao,
  tep.estabelecimentoestoqueprodutodescricao AS produto_descricao,
  tep.estabelecimentoestoqueprodutoquantidade AS quantidade_produto,
  e.estabelecimentonomefantasia AS estabelecimento_nome_fantasia
FROM transacaoestabelecimentoparceiro tep
JOIN parceiro p ON tep.parceiroid = p.parceiroid
JOIN estabelecimentoestoque ee ON tep.estabelecimentoestoqueid = ee.estabelecimentoestoqueid
JOIN estabelecimento e ON ee.estabelecimentoid = e.estabelecimentoid
WHERE p.usuarioid =  $1`;
        
  const result = await client.query(query, [usuarioID]);
  return result.rows;
}

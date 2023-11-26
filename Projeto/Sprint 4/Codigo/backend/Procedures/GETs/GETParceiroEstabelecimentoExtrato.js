const { Client } = require("pg");

export async function GETParceiroEstabelecimentoExtrato(client, usuarioID) {
  // await client.connect();

  const query = `
  SELECT
  ttep.transacaoestabelecimentoparceirodata AS data_transacao,
  ttep.parceirocreditoquantidade AS quantidade_creditos,
  est.estabelecimentonomefantasia AS nome_fantasia
FROM transacaoestabelecimentoparceiro ttep
JOIN parceiro p ON ttep.parceiroid = p.parceiroid
JOIN estabelecimentoestoque ee ON ttep.estabelecimentoestoqueid = ee.estabelecimentoestoqueid
JOIN estabelecimento est ON ee.estabelecimentoid = est.estabelecimentoid
WHERE p.usuarioid = $1;
      `;

  const result = await client.query(query, [usuarioID]);
  return result.rows;
}

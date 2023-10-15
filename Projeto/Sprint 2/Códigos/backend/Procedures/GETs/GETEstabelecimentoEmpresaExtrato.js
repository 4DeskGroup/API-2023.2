const { Client } = require("pg");

export async function GETEstabelecimentoEmpresaExtrato(client, usuarioID) {
  // await client.connect();

  const query = `
  SELECT
  tee.transacaoestabelecimentoempresadata AS data_transacao,
  tee.transacaoestabelecimentoempresacreditos AS quantidade_creditos,
  e.empresanomefantasia AS nome_fantasia
FROM transacaoestabelecimentoempresa tee
JOIN estabelecimento est ON tee.estabelecimentoid = est.estabelecimentoid
JOIN empresa e ON tee.empresaid = e.empresaid
WHERE est.usuarioid = $1;
      `;

  const result = await client.query(query, [usuarioID]);
  return result.rows;
}

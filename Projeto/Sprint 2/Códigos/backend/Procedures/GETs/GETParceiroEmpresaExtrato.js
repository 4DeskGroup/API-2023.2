const { Client } = require("pg");

export async function GETParceiroEmpresaExtrato(client, usuarioID) {
  // await client.connect();

  const query = `
  SELECT
  hpe.historicoparceiroempresadata AS data_transacao,
  hpe.historicoparceiroempresaprodutoquantidade AS quantidade_produto,
  pe.parceiroestoqueprodutodescricao AS tipo_produto,
  hpe.historicoparceiroempresacreditoquantidade AS quantidade_credito,
  e.empresanomefantasia AS nome_empresa
FROM historicoparceiroempresa hpe
JOIN parceiroestoque pe ON hpe.parceiroestoqueid = pe.parceiroestoqueid
JOIN parceiro p ON pe.parceiroid = p.parceiroid
JOIN empresa e ON hpe.empresaid = e.empresaid
WHERE p.usuarioid = $1;
      `;

  const result = await client.query(query, [usuarioID]);
  return result.rows;
}

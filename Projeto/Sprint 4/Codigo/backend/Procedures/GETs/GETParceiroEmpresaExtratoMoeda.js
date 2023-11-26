const { Client } = require("pg");

export async function GETParceiroEmpresaExtratoMoeda(client, usuarioID) {
  // await client.connect();

  const query = `
  SELECT
  hpe.historicoparceiroempresadata AS data_transacao,
  hpe.historicoparceiroempresacreditoquantidade AS quantidade_creditos,
  e.empresanomefantasia AS nome_fantasia
FROM historicoparceiroempresa hpe
JOIN parceiro p ON hpe.parceiroid = p.parceiroid
JOIN empresa e ON hpe.empresaid = e.empresaid
WHERE p.usuarioid = $1 and hpe.HistoricoParceiroEmpresaTipoTransacao = 'MoedaEmpresa';
      `;

  const result = await client.query(query, [usuarioID]);
  return result.rows;
}

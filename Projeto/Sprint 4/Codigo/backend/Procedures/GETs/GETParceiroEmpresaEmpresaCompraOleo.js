const { Client } = require("pg");

export async function GETParceiroEmpresaEmpresaCompraOleo(client, usuarioID) {
  // await client.connect();

  const query = `
  SELECT
  hpe.historicoparceiroempresadata AS data_transacao,
  hpe.historicoparceiroempresacreditoquantidade AS quantidade_creditos,
  p.parceironomefantasia AS nome_fantasia,
  hpe.historicoparceiroempresaprodutodescricao AS produto_descricao,
  hpe.historicoparceiroempresaprodutoquantidade AS produto_quantidade
FROM historicoparceiroempresa hpe
JOIN parceiro p ON hpe.parceiroid = p.parceiroid
JOIN empresa e ON hpe.empresaid = e.empresaid
WHERE e.usuarioid = $1 and hpe.HistoricoParceiroEmpresaTipoTransacao = 'EmpresaCompraOleo';
      `;

  const result = await client.query(query, [usuarioID]);
  return result.rows;
}

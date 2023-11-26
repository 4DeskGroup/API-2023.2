const { Client } = require("pg");

export async function GETHistoricosRecebimentosMoedas(client, usuarioID) {
  const queryPrimeiro = `
    SELECT
      hpe.historicoparceiroempresadata AS data_transacao,
      hpe.historicoparceiroempresacreditoquantidade AS quantidade_creditos,
      p.parceironomefantasia AS nome_fantasia
    FROM historicoparceiroempresa hpe
    JOIN parceiro p ON hpe.parceiroid = p.parceiroid
    JOIN empresa e ON hpe.empresaid = e.empresaid
    WHERE e.usuarioid = $1 and hpe.HistoricoParceiroEmpresaTipoTransacao = 'MoedaEmpresa';
  `;

  const resultPrimeiro = await client.query(queryPrimeiro, [usuarioID]);

  // Função para obter transações de TransacaoEstabelecimentoEmpresa
  const querySegunda = `
    SELECT
      tee.transacaoestabelecimentoempresadata AS data_transacao,
      tee.transacaoestabelecimentoempresacreditos AS quantidade_creditos,
      et.estabelecimentonomefantasia AS nome_fantasia
    FROM transacaoestabelecimentoempresa tee
    JOIN empresa e ON tee.empresaid = e.empresaid
    JOIN estabelecimento et ON tee.estabelecimentoid = et.estabelecimentoid
    WHERE e.usuarioid = $1;
  `;

  const resultSegundo = await client.query(querySegunda, [usuarioID]);
  // Combine os resultados das duas consultas em um único objeto
  const transacoesCombinadas = [];

  // Processar resultados da primeira consulta
  for (const row of resultPrimeiro.rows) {
    transacoesCombinadas.push({
      data_transacao: row.data_transacao,
      quantidade_creditos: row.quantidade_creditos,
      nome_fantasia: 'Parceiro: ' + row.nome_fantasia,
    });
  }

  // Processar resultados da segunda consulta
  for (const row of resultSegundo.rows) {
    transacoesCombinadas.push({
      data_transacao: row.data_transacao,
      quantidade_creditos: row.quantidade_creditos,
      nome_fantasia: 'Estabelecimento: '+ row.nome_fantasia,
    });
  }

  return transacoesCombinadas;
}

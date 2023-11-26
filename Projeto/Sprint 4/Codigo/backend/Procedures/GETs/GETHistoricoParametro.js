export async function GETHistoricoParametro(client) {
    try {
        let retornoHistoricoParametro = [];

        const SQL = "SELECT * FROM HistoricoParametro"

        const result = await client.query(SQL)

        if (result.rows.length > 0) {
            for (const row of result.rows) {

                const historicoParametroRetorno = {
                    HistoricoParametrizacaoID: row.historicoparametrizacaoid,
                    ParametroID: row.parametroid,
                    HistoricoParametroData: row.historicoparametrodata,
                    HistoricoParametroDescricao: row.historicoparametrodescricao,
                    HistoricoParametroProduto: row.historicoparametroproduto,
                    HistoricoParametroValor: row.historicoparametrovalor
                }

                retornoHistoricoParametro.push(historicoParametroRetorno)
            }

            return { retornoHistoricoParametro }
        }
    } catch (erro) {
        console.log(erro)
    }
}
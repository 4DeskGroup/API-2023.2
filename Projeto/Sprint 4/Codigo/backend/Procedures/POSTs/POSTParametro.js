import { SETParametro } from "../SETs/SETParametro"

export async function POSTParametro(client, parametro, data) {
    try {
        let isSucesso = false;

        const retorno = await SETParametro(client, parametro)

        if (retorno) {
            const historicoParametro = {
                ParametroID: retorno.retornoParametro.ParametroID,
                HistoricoParametroData: data,
                HistoricoParametroDescricao: retorno.retornoParametro.ParametroIdentificador,
                HistoricoParametroProduto: retorno.retornoParametro.ParamentroNome,
                HistoricoParametroValor: retorno.retornoParametro.ParametroValorNumerico
            }

            const SQL = "INSERT INTO HistoricoParametro (ParametroID, HistoricoParametroData, HistoricoParametroDescricao, HistoricoParametroProduto, HistoricoParametroValor) VALUES ($1, $2, $3, $4, $5)"

            const values = [historicoParametro.ParametroID, historicoParametro.HistoricoParametroData, historicoParametro.HistoricoParametroDescricao, historicoParametro.HistoricoParametroProduto, historicoParametro.HistoricoParametroValor]

            const resultado = await client.query(SQL, values)

            const parametroRetorno = retorno.retornoParametro

            isSucesso = true

            return { isSucesso, parametroRetorno}
        }
    } catch (erro) {
        console.log(erro)
    }
}
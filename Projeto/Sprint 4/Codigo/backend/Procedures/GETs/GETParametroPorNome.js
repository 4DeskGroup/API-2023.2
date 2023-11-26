export async function GETParametroPorNome(client, parametroNome) {
    try{
        const SQL = "SELECT * FROM Parametro WHERE ParametroNome = $1;"

        const result = await client.query(SQL, [parametroNome])
        const parametro = result.rows[0]

        const retornoParametro = {
            ParametroID: parametro.parametroid,
            ParametroIdentificador: parametro.parametroidentificador,
            ParamentroNome: parametro.parametronome,
            ParametroValor: parametro.parametrovalor,
            ParametroValorNumerico: parametro.parametrovalornumerico
        }

        return { retornoParametro }
    } catch (erro) {
        console.log(erro)
    }
}
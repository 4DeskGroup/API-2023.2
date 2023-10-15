export async function GETParceiroEstoque(client, ParceiroID) {
    try {
        let isSucesso = false
        let parceiroEstoque = null

        const SQL = "SELECT * FROM ParceiroEstoque WHERE ParceiroID = $1"
        const values = [ParceiroID]

        const retorno = await client.query(SQL, values)


        if (retorno.rows.length > 0) {
            const parceiroEstoqueEncontrado = retorno.rows[0]

            parceiroEstoque = {
                ParceiroEstoqueID: parceiroEstoqueEncontrado.parceiroestoqueid,
                ParceiroID: parceiroEstoqueEncontrado.parceiroid,
                ParceiroEstoqueProdutoDescricao: parceiroEstoqueEncontrado.parceiroestoqueprodutodescricao,
                ParceiroEstoqueTipo: parceiroEstoqueEncontrado.parceiroestoquetipo,
                ParceiroEstoqueProdutoQuantidade: parceiroEstoqueEncontrado.parceiroestoqueprodutoquantidade
            }

            isSucesso = true

            return { isSucesso, parceiroEstoque }
        } else {
            return { isSucesso: false, parceiroEstoque: null }
        }

    } catch (error) {
        console.log(`Deu esse erro aqui ó ${error}`)
    }
}
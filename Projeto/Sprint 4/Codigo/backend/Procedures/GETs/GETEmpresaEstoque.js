export async function GETEmpresaEstoque(client, EmpresaID) {
    try {
        let isSucesso = false
        let EmpresaEstoque = null

        const SQL = "SELECT * FROM EmpresaEstoque WHERE EmpresaID = $1"
        const values = [EmpresaID]

        const retorno = await client.query(SQL, values)


        if (retorno.rows.length > 0) {
            const EmpresaEstoqueEncontrado = retorno.rows[0]

            EmpresaEstoque = {
                EmpresaEstoqueID: EmpresaEstoqueEncontrado.empresaestoqueid,
                EmpresaID: EmpresaEstoqueEncontrado.empresaid,
                EmpresaEstoqueProdutoDescricao: EmpresaEstoqueEncontrado.empresaestoqueestoqueprodutodescricao,
                EmpresaEstoqueTipo: EmpresaEstoqueEncontrado.empresaestoqueestoquetipo,
                EmpresaEstoqueProdutoQuantidade: EmpresaEstoqueEncontrado.empresaestoqueestoqueprodutoquantidade
            }

            isSucesso = true

            return { isSucesso, EmpresaEstoque }
        } else {
            return { isSucesso: false, EmpresaEstoque: null }
        }

    } catch (error) {
        console.log(`Deu esse erro aqui ó ${error}`)
    }
}
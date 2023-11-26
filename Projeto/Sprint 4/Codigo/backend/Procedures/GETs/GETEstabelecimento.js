export async function GETEstabelecimento(client, usuarioID) {
    try {
        const SQL = "SELECT * FROM Estabelecimento WHERE UsuarioID = $1"
        const values = [usuarioID]
        const result = await client.query(SQL, values)

        let isSucesso = false
        let retornoEstab = null

        if (result.rows.length > 0) {
            const estabEncontrado = result.rows[0]

            retornoEstab = {
                UsuarioID: estabEncontrado.usuarioid,
                EstabelecimentoNomeFantasia: estabEncontrado.estabelecimentonomefantasia,
                EstabelecimentoNomeCompleto: estabEncontrado.estabelecimentonomecompleto,
                EstabelecimentoResponsavel: estabEncontrado.estabelecimentoresponsavel,
                EstabelecimentoDataCadastro: estabEncontrado.estabelecimentodatacadastro,
                EstabelecimentoCNPJ: estabEncontrado.estabelecimentocnpj,
                EstabelecimentoVolumeOleoMensal: estabEncontrado.estabelecimentovolumeoleomensal,
                EstabelecimentoEndereco: estabEncontrado.estabelecimentoendereco,
                EstabelecimentoEnderecoNumero: estabEncontrado.estabelecimentoendereconumero,
                EstabelecimentoBairro: estabEncontrado.estabelecimentobairro,
                EstabelecimentoCidade: estabEncontrado.estabelecimentocidade,
                EstabelecimentoUF: estabEncontrado.estabelecimentouf,
                EstabelecimentoPrincipaisParceiros: estabEncontrado.estabelecimentoprincipaisparceiros,
                EstabelecimentoCreditoQuantidade: estabEncontrado.estabelecimentocreditoquantidade
            }
            
            isSucesso = true
            return { isSucesso, retornoEstab}
        }

    } catch (error) {
        console.log(error)
    }
}
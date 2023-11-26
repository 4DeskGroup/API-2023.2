export async function PUTEstabelecimento(client, UsuarioID, estabelecimentoInfo) {
    try {
        let isSucesso = false

        const SQL = "UPDATE Estabelecimento SET EstabelecimentoNomeFantasia = $1, EstabelecimentoNomeCompleto = $2, EstabelecimentoResponsavel = $3, EstabelecimentoDataCadastro = $4, EstabelecimentoCNPJ = $5, EstabelecimentoVolumeOleoMensal = $6, EstabelecimentoEndereco = $7, EstabelecimentoEnderecoNumero = $8, EstabelecimentoBairro = $9, EstabelecimentoCidade = $10, EstabelecimentoUF = $11, EstabelecimentoPrincipaisParceiros = $12 WHERE UsuarioID = $13"
        
        const values = [
            estabelecimentoInfo.EstabelecimentoNomeFantasia,
            estabelecimentoInfo.EstabelecimentoNomeCompleto,
            estabelecimentoInfo.EstabelecimentoResponsavel,
            estabelecimentoInfo.EstabelecimentoCNPJ,
            estabelecimentoInfo.EstabelecimentoDataCadastro,
            estabelecimentoInfo.EstabelecimentoVolumeOleoMensal,
            estabelecimentoInfo.EstabelecimentoEndereco,
            estabelecimentoInfo.EstabelecimentoEnderecoNumero,
            estabelecimentoInfo.EstabelecimentoBairro,
            estabelecimentoInfo.EstabelecimentoCidade,
            estabelecimentoInfo.EstabelecimentoUF,
            estabelecimentoInfo.EstabelecimentoPrincipaisParceiros,
            UsuarioID
        ]

        const result = await client.query(SQL, values)

        if (result.rowCount > 0) {
            isSucesso = true
        }

        return { isSucesso }
    } catch (erro) {
        console.log(erro)
    }
}

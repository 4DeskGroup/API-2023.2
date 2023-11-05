export async function GETParceiro(client, usuarioID) {
    try {
        const SQL = "SELECT * FROM Parceiro WHERE UsuarioID = $1"
        const values = [usuarioID]
        const result = await client.query(SQL, values)

        let isSucesso = false
        let retornoParceiro = null

        if (result.rows.length > 0) {
            const parceiroEncontrado = result.rows[0]

            retornoParceiro = {
                UsuarioID: parceiroEncontrado.usuarioid,
                ParceiroNomeFantasia: parceiroEncontrado.parceironomefantasia,
                ParceiroNomeCompleto: parceiroEncontrado.parceironomecompleto,
                ParceiroResponsavel: parceiroEncontrado.parceiroresponsavel,
                ParceiroDataCadastro: parceiroEncontrado.parceirodatacadastro,
                ParceiroCNPJ: parceiroEncontrado.parceirocnpj,
                ParceiroVolumeOleoMensal: parceiroEncontrado.parceirovolumeoleomensal,
                ParceiroEndereco: parceiroEncontrado.parceiroendereco,
                ParceiroEnderecoNumero: parceiroEncontrado.parceiroendereconumero,
                ParceiroBairro: parceiroEncontrado.parceirobairro,
                ParceiroCidade: parceiroEncontrado.parceirocidade,
                ParceiroUF: parceiroEncontrado.parceirouf,
                ParceiroCidadesAtendimento: parceiroEncontrado.parceirocidadesatendimento,
                ParceiroPrincipaisParceiros: parceiroEncontrado.parceiroprincipaisparceiros,
                ParceiroCreditoQuantidade: parceiroEncontrado.parceirocreditoquantidade
            }
            
            isSucesso = true
            return { isSucesso, retornoParceiro}
        }

    } catch (error) {
        console.log(error)
    }
}
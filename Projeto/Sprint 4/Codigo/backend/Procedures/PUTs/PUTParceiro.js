export async function PUTParceiro(client, UsuarioID, parceiroInfo) {
    try {
        let isSucesso = false

        const SQL = "UPDATE Parceiro SET ParceiroNomeFantasia = $1, ParceiroNomeCompleto = $2, ParceiroResponsavel = $3, ParceiroDataCadastro = $4, ParceiroCNPJ = $5, ParceiroVolumeOleoMensal = $6, ParceiroEndereco = $7, ParceiroEnderecoNumero = $8, ParceiroBairro = $9, ParceiroCidade = $10, ParceiroUF = $11, ParceiroCidadesAtendimento = $12, ParceiroPrincipaisParceiros = $13 WHERE UsuarioID = $14"
        
        const values = [
            parceiroInfo.ParceiroNomeFantasia,
            parceiroInfo.ParceiroNomeCompleto,
            parceiroInfo.ParceiroResponsavel,
            parceiroInfo.ParceiroDataCadastro,
            parceiroInfo.ParceiroCNPJ,
            parceiroInfo.ParceiroVolumeOleoMensal,
            parceiroInfo.ParceiroEndereco,
            parceiroInfo.ParceiroEnderecoNumero,
            parceiroInfo.ParceiroBairro,
            parceiroInfo.ParceiroCidade,
            parceiroInfo.ParceiroUF,
            parceiroInfo.ParceiroCidadesAtendimento,
            parceiroInfo.ParceiroPrincipaisParceiros,
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
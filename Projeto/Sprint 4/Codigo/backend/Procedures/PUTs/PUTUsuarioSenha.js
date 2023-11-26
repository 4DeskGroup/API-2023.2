import bcrypt from "bcrypt"

export async function PUTUsuarioSenha(client, UsuarioID, novaSenha) {
    try {
        const senhaCripto = await bcrypt.hash(novaSenha, 10);

        const SQL = "UPDATE Usuario SET UsuarioSenha = $1 WHERE UsuarioID = $2"
        const values = [senhaCripto, UsuarioID]

        const result = await client.query(SQL, values)

        return { isSucesso: result.rowCount > 0}

    } catch (erro) {
    console.log(erro)
    }
}
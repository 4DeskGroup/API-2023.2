export async function DELUsuario(client, usuarioID) {
    try {
        let isSucesso = false

        const SQL = "DELETE FROM Usuario WHERE UsuarioID = $1"
        const values = [usuarioID]
        
        const result = await client.query(SQL, values)

        if (result.rowCount > 0) {
            isSucesso = true

            return { isSucesso }
        }

    } catch (erro) {
        console.log(erro)
    }
}
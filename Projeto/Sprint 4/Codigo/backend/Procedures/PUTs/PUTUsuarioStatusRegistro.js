export async function PUTUsuarioStatusRegistro(client, usuarioID) {
    try {

        const SQL = "UPDATE Usuario SET UsuarioStatusRegistro = false WHERE UsuarioID = $1"
        const values = [usuarioID]

        const result = await client.query(SQL, values)

        return { isSucesso: result.rowCount > 0}

    } catch (erro) {
    console.log(erro)
    }
}
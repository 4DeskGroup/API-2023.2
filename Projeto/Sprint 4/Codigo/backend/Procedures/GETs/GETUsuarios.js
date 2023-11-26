export async function GETUsuarios(client) {
    try {
        let isSucesso = false;
        let retornoUsuarios = [];

        const SQL = "SELECT * FROM Usuario where UsuarioStatusRegistro = true"

        const result = await client.query(SQL)

        if (result.rows.length > 0) {
            for (const row of result.rows) {
                const usuario = {
                    UsuarioID: row.usuarioid,
                    UsuarioNome: row.usuarionome,
                    UsuarioEmail: row.usuarioemail,
                    UsuarioTipo: row.usuariotipo,
                    UsuarioDataCadastro: row.usuariodatacadastro,
                    UsuarioStatus: row.usuariostatusregistro
                }
                retornoUsuarios.push(usuario)
            }

            isSucesso = true;
            return { isSucesso, retornoUsuarios };
        }
    } catch (erro) {
        console.log(erro)
    }
}
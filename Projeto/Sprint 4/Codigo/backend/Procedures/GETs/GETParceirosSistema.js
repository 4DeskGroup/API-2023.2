export async function GETParceirosSistema(client) {
    try {
        const SQL = "SELECT COUNT(*) FROM Usuario where UsuarioTipo = 'Parceiro' and UsuarioStatusRegistro = true";
        const result = await client.query(SQL);

        if (result.rows.length > 0) {
            const parceirosQuantidade = result.rows[0].count
            return parceirosQuantidade;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

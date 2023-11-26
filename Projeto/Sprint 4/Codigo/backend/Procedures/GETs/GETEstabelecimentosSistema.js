export async function GETEstabelecimentosSistema(client) {
    try {
        const SQL = "SELECT COUNT(*) FROM Usuario where UsuarioTipo = 'Estabelecimento' and UsuarioStatusRegistro = true";
        const result = await client.query(SQL);

        if (result.rows.length > 0) {
            const estabalecimentosQuantidade = result.rows[0].count
            return estabalecimentosQuantidade;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

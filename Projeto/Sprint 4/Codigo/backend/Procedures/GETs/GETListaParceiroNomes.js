export async function GETListaParceiroNomes(client) {
    try {
        const SQL = "SELECT p.parceiroNomefantasia FROM parceiro p INNER JOIN usuario u ON p.usuarioid = u.usuarioid WHERE u.usuarioStatusRegistro = true;";
        const result = await client.query(SQL);

        if (result.rows.length > 0) {
            const parceiros = result.rows.map(row => ({
                parceiroNomefantasia: row.parceironomefantasia,
            }));
            // console.log(parceiros);
            return parceiros;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

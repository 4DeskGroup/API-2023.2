const { Client } = require('pg');

export async function GETEstabelecimentoEstoqueHistorico(client, usuarioID) {
    // await client.connect();

    const query = `
      SELECT * FROM historicoestabelecimentoestoque 
      WHERE EstabelecimentoID IN (
        SELECT EstabelecimentoID FROM Estabelecimento WHERE UsuarioID = $1
      )`;

    const result = await client.query(query, [usuarioID]);
    return result.rows;
}
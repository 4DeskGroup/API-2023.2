const { Client } = require('pg');

export async function GETEstabelecimentoEstoqueByUsuarioID(client, usuarioID) {
    // await client.connect();

    const query = `
      SELECT * FROM EstabelecimentoEstoque 
      WHERE EstabelecimentoID IN (
        SELECT EstabelecimentoID FROM Estabelecimento WHERE UsuarioID = $1
      )`;

    const result = await client.query(query, [usuarioID]);
    return result.rows;
}
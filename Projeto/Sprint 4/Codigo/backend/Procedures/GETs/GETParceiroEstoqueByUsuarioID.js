const { Client } = require('pg');

export async function GETParceiroEstoqueByUsuarioID(client, usuarioID) {
    // await client.connect();

    const query = `
      SELECT * FROM ParceiroEstoque 
      WHERE ParceiroID IN (
        SELECT ParceiroID FROM Parceiro WHERE UsuarioID = $1
      )`;

    const result = await client.query(query, [usuarioID]);
    return result.rows;
}
const { Pool } = require('pg');

export async function VerificaUserEmail(client, email) {
  try {
    const query = 'SELECT COUNT(*) AS userCount FROM usuario WHERE UsuarioEmail = $1';
    const values = [email];
    const result = await client.query(query, values);

    // Se userCount for maior que 0, significa que o usuário com esse email já existe
    return result.rows[0].usercount > 0;
  } catch (err) {
    console.error('Erro ao verificar a existência do usuário por email:', err);
    throw err;
  }
}

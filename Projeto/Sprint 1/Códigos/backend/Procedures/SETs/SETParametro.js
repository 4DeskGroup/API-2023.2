const { Pool } = require('pg');


export async function SETParametro(client,Parametro) {
await client.connect();
  
  try {
    const query = `
      INSERT INTO Parametro (ParametroIdentificador, ParametroNome, ParametroValor, ParametroValorNumerico)
      VALUES ($1, $2, $3, $4)
    `;

    const values = [Parametro.identificador, Parametro.nome, Parametro.valor, Parametro.valorNumerico];

    await client.query(query, values);

    console.log('Informações inseridas com sucesso na tabela Parametro.');
  } catch (error) {
    console.error('Erro ao inserir informações na tabela Parametro:', error);
  } finally {
    client.release(); // Libera o cliente de volta para o pool
  }
}
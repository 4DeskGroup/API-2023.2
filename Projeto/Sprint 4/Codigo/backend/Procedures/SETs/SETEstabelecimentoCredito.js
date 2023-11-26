const { Pool } = require('pg');

// Função para inserir informações na tabela EstabelecimentoCredito
export async function SETEstabelecimentoCredito(client,EstabelecimentoCredito) {
// await client.connect();
  
  try {
    const query = `
      INSERT INTO EstabelecimentoCredito (EstabelecimentoID, EstabelecimentoCreditoQuantidade)
      VALUES ($1, $2)
    `;

    const values = [EstabelecimentoCredito.estabelecimentoID, EstabelecimentoCredito.quantidade];

    await client.query(query, values);

    console.log('Informações inseridas com sucesso na tabela EstabelecimentoCredito.');
  } catch (error) {
    console.error('Erro ao inserir informações na tabela EstabelecimentoCredito:', error);
  } finally {
    client.release(); // Libera o cliente de volta para o pool
  }
}
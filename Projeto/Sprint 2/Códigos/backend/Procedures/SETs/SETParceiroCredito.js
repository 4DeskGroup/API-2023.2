const { Pool } = require('pg');


export async function SETParceiroCredito(client,parceiroCredito) {
    // await client.connect();
  
    try {
      const query = `
        INSERT INTO ParceiroCredito (ParceiroID, ParceiroCreditoQuantidade)
        VALUES ($1, $2)
      `;
  
      const values = [parceiroCredito.parceiroID, parceiroCredito.quantidade];
  
      await client.query(query, values);
  
      console.log('Informações inseridas com sucesso na tabela ParceiroCredito.');
    } catch (error) {
      console.error('Erro ao inserir informações na tabela ParceiroCredito:', error);
    } finally {
      client.release();
    }
  }
const { Pool } = require('pg');

export async function SETParceiroCompraCredito(client,ParceiroCompraCredito) {
    // await client.connect();
    
  try {
    const query = `
      INSERT INTO ParceiroCompraCredito (ParceiroID, ParceiroCompraCreditoQuantidade, ParceiroCompraCreditoDescricao, ParceiroCompraCreditoData)
      VALUES ($1, $2, $3, $4)
    `;

    const values = [ParceiroCompraCredito.parceiroID, ParceiroCompraCredito.quantidade, ParceiroCompraCredito.descricao, ParceiroCompraCredito.data];

    await client.query(query, values);

    console.log('Informações inseridas com sucesso na tabela ParceiroCompraCredito.');
  } catch (error) {
    console.error('Erro ao inserir informações na tabela ParceiroCompraCredito:', error);
  } finally {
    client.release();
  }
}
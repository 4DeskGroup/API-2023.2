const { Pool } = require('pg');

// Função para inserir informações na tabela Produto
export async function SETProduto(client,Produto) {
    // await client.connect();

  try {
    const query = `
      INSERT INTO Produto (ProdutoDescricao, ProdutoValor)
      VALUES ($1, $2)
    `;

    const values = [Produto.descricao, Produto.valor];

    await client.query(query, values);

    console.log('Informações inseridas com sucesso na tabela Produto.');
  } catch (error) {
    console.error('Erro ao inserir informações na tabela Produto:', error);
  } finally {
    client.release(); // Libera o cliente de volta para o pool
  }
}
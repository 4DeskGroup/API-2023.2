const { Pool } = require('pg');

// Função para inserir informações na tabela EstabelecimentoEstoque
export async function SETEstabelecimentoEstoque(client, EstabelecimentoEstoque) {
  // const client = await pool.connect();

  try {
    const query = `
      INSERT INTO EstabelecimentoEstoque (EstabelecimentoID, EstabelecimentoEstoqueProdutoDescricao, EstabelecimentoEstoqueProdutoQuantidade)
      VALUES ($1, $2, $3)
    `;
    
    const values = [EstabelecimentoEstoque.estabelecimentoID, EstabelecimentoEstoque.produtoDescricao, EstabelecimentoEstoque.produtoQuantidade];

    await client.query(query, values);

    console.log('Informações inseridas com sucesso na tabela EstabelecimentoEstoque.');
  } catch (error) {
    console.error('Erro ao inserir informações na tabela EstabelecimentoEstoque:', error);
  } finally {
    client.release(); // Libera o cliente de volta para o pool
  }
}
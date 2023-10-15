const { Pool } = require('pg');

// Função para inserir informações na tabela HistoricoProdutoCompra
export async function SETHistoricoProdutoCompra(client, HistoricoProdutoCompra) {
    // await client.connect();
  
  try {
    const query = `
      INSERT INTO HistoricoProdutoCompra (ProdutoID, EstabelecimentoID, EmpresaID, HistoricoProdutoCompraData, HistoricoProdutoCompraDescricao)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [HistoricoProdutoCompra.produtoID, HistoricoProdutoCompra.estabelecimentoID, HistoricoProdutoCompra.empresaID, HistoricoProdutoCompra.data, HistoricoProdutoCompra.descricao];

    await client.query(query, values);

    console.log('Informações inseridas com sucesso na tabela HistoricoProdutoCompra.');
  } catch (error) {
    console.error('Erro ao inserir informações na tabela HistoricoProdutoCompra:', error);
  } finally {
    client.release(); // Libera o cliente de volta para o pool
  }
}
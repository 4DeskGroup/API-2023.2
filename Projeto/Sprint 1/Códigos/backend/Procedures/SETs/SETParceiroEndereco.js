const { Pool } = require('pg');

export async function SETParceiroEndereco(client, ParceiroEndereco) {
    await client.connect();
  
    try {
      const query = `
        INSERT INTO ParceiroEndereco (ParceiroID, ParceiroEnderecoCEP, ParceiroEnderecoLogradouro, ParceiroEnderecoCidade, ParceiroEnderecoUF, ParceiroEnderecoNumero)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
  
      const values = [ParceiroEndereco.parceiroID, ParceiroEndereco.cep, ParceiroEndereco.logradouro, ParceiroEndereco.cidade,ParceiroEndereco.uf, ParceiroEndereco.numero];
  
      await client.query(query, values);
  
      console.log('Informações inseridas com sucesso na tabela ParceiroEndereco.');
    } catch (error) {
      console.error('Erro ao inserir informações na tabela ParceiroEndereco:', error);
    } finally {
      client.release();
    }
  }
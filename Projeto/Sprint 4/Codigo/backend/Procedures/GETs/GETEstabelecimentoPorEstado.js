export async function GETEstabelecimentoPorEstado(client) {
    try {
      const SQL = `
        SELECT
          EstabelecimentoUF as name,
          COUNT(*) AS valor
        FROM
          Estabelecimento
        WHERE
          EstabelecimentoUF IS NOT NULL
        GROUP BY
          EstabelecimentoUF;
      `;
  
      const result = await client.query(SQL);
  
      if (result.rows.length > 0) {
        // Mapeia os resultados para um formato mais legível, se necessário
        const quantidadeEstabelecimentoPorEstado = result.rows.map((row) => ({
          name: row.name,
          valor: row.valor,
        }));
  
        return quantidadeEstabelecimentoPorEstado;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
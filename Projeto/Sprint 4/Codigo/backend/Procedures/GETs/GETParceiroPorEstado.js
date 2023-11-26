export async function GETParceiroPorEstado(client) {
    try {
      const SQL = `
        SELECT
          ParceiroUF as name,
          COUNT(*) AS valor
        FROM
          Parceiro
        WHERE
          ParceiroUF IS NOT NULL
        GROUP BY
          ParceiroUF;
      `;
  
      const result = await client.query(SQL);
  
      if (result.rows.length > 0) {
        // Mapeia os resultados para um formato mais legível, se necessário
        const quantidadeParceirosPorEstado = result.rows.map((row) => ({
          name: row.name,
          valor: row.valor,
        }));
  
        return quantidadeParceirosPorEstado;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
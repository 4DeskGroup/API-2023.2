export async function GETTopParceiro(client) {
    try {
      const SQL = `
        SELECT
          P.ParceiroID,
          P.ParceiroNomeFantasia as name,
          SUM(T.EstabelecimentoEstoqueProdutoQuantidade) AS valor
        FROM
          TransacaoEstabelecimentoParceiro T
        INNER JOIN
          Parceiro P ON T.ParceiroID = P.ParceiroID
        GROUP BY
          P.ParceiroID, P.ParceiroNomeFantasia
        ORDER BY
        valor DESC
        LIMIT 5;
      `;
  
      const result = await client.query(SQL);
  
      if (result.rows.length > 0) {
        // Mapeia os resultados para um formato mais legível, se necessário
        const topParceiros = result.rows.map((row) => ({
          name: row.name,
          valor: row.valor,
        }));
  
        return topParceiros;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
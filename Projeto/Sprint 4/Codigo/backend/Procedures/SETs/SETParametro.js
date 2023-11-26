const { Pool } = require('pg');


export async function SETParametro(client, parametro) {
// await client.connect();
  
  try {
    // const query = `
    //   INSERT INTO Parametro (ParametroIdentificador, ParametroNome, ParametroValor, ParametroValorNumerico)
    //   VALUES ($1, $2, $3, $4) RETURNING * `;

    const query = "UPDATE Parametro SET ParametroValor = $1, ParametroValorNumerico = $2 WHERE ParametroIdentificador = 'ValorOleo' and ParametroNome = $3 RETURNING *"

    const values = [parametro.ParametroValor, parametro.ParametroValorNumerico, parametro.ParametroNome];

    const result = await client.query(query, values);
    const parametroRetorno = result.rows[0];

    console.log('Informações atualizadas com sucesso na tabela Parametro.');

    const retornoParametro = {
      ParametroID: parametroRetorno.parametroid,
      ParametroIdentificador: parametroRetorno.parametroidentificador,
      ParamentroNome: parametroRetorno.parametronome,
      ParametroValor: parametroRetorno.parametrovalor,
      ParametroValorNumerico: parametroRetorno.parametrovalornumerico
    }

    return { retornoParametro }
  } catch (error) {
    console.error('Erro ao inserir informações na tabela Parametro:', error);
  }
}
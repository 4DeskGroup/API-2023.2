const { Pool } = require('pg');

// Função para inserir informações na tabela Empresa
export async function SETEmpresa(client,empresa) {
// await client.connect();

  const query = `
    INSERT INTO Empresa (UsuarioID, EmpresaNomeFantasia, EmpresaNomeCompleto, EmpresaResponsavel, EmpresaDataCadastro, EmpresaCNPJ)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING EmpresaID;
  `;

  try {
    const { rows } = await client.query(query, [
        empresa.UsuarioID,
        empresa.EmpresaNomeFantasia,
        empresa.EmpresaNomeCompleto,
        empresa.EmpresaResponsavel,
        empresa.EmpresaDataCadastro,
        empresa.EmpresaCNPJ,
    ]);

    const empresaID = rows[0].EmpresaID;
    console.log(`Empresa inserida com sucesso. ID: ${empresaID}`);
    return empresaID;
  } catch (error) {
    console.error('Erro ao inserir empresa:', error);
    throw error;
  }
}
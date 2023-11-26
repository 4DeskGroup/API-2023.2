const { Client } = require('pg');

export async function GETListaEmpresaEstoque(client, UsuarioID) {
  // await client.connect();

  try {
    let isSucesso = false;
    let retornoEmpresaEstoque = [];

    const parceiroEstoqueQuery = 'SELECT * FROM EmpresaEstoque WHERE EmpresaID IN (SELECT EmpresaID FROM Empresa WHERE UsuarioID = $1);';

    const values = [UsuarioID];

    const parceiroEstoqueResult = await client.query(parceiroEstoqueQuery, values);

    if (parceiroEstoqueResult.rows.length > 0) {
      for (const EmpresaEstoqueEncontrado of parceiroEstoqueResult.rows) {
        const EmpresaEstoque = {
          EmpresaEstoqueID: EmpresaEstoqueEncontrado.empresaestoqueid,
          EmpresaID: EmpresaEstoqueEncontrado.empresaid,
          EmpresaEstoqueProdutoDescricao: EmpresaEstoqueEncontrado.empresaestoqueestoqueprodutodescricao,
          EmpresaEstoqueTipo: EmpresaEstoqueEncontrado.empresaestoqueestoquetipo,
          EmpresaEstoqueProdutoQuantidade: EmpresaEstoqueEncontrado.empresaestoqueestoqueprodutoquantidade
        };
        retornoEmpresaEstoque.push(EmpresaEstoque);
      }

      isSucesso = true;
    }
    const retornoEmpresaEstoqueJSON = JSON.stringify(retornoEmpresaEstoque)
    return { isSucesso, retornoEmpresaEstoqueJSON };
  } catch (error) {
    console.error('Erro ao obter o EmpresaEstoque:', error);
    throw error; // Você pode tratar o erro conforme necessário ou relançá-lo
  } 
}

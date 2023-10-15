const { client } = require('pg');


export async function POSTParceiroEmpresa(client, UsuarioID, ParceiroEstoqueTipo, EmpresaNome, HistoricoParceiroEmpresa) {

  const result = {
    isSuccess: false,
    message: ''
  };
  try {
    var LocalERRO = 'SELECT Empresa'
    const empresaidQuery = {
      text: '  SELECT EmpresaID from Empresa where EmpresaNomeFantasia = $1',
      values: [EmpresaNome],
    };
    const resultEmpresaID = await client.query(empresaidQuery);
    const { empresaid } = resultEmpresaID.rows[0];
    
    LocalERRO = '  SELECT PARCEIROESTOQUEID'
    const estabelecimentoQuery = {
      text: 'SELECT parceiroestoqueid,parceiroestoqueprodutoquantidade FROM ParceiroEstoque WHERE parceiroID IN (SELECT parceiroID FROM parceiro WHERE UsuarioID = $1) AND ParceiroEstoqueTipo = $2',
      values: [UsuarioID, ParceiroEstoqueTipo],
    };
    const ResultParceiroEstoqueID = await client.query(estabelecimentoQuery);
    const { parceiroestoqueid, parceiroestoqueprodutoquantidade } = ResultParceiroEstoqueID.rows[0];

    if (HistoricoParceiroEmpresa.ProdutoQuantidade > parceiroestoqueprodutoquantidade) {
      result.message = "A quantidade do óleo é maior que a disponível no estoque";
      result.isSuccess = false
      return result
    }

    LocalERRO = '  UPD PARCEIROESTOQUE'
    const updateParceiroEstoqueQuery = {
      text: 'UPDATE ParceiroEstoque SET ParceiroEstoqueProdutoQuantidade = ParceiroEstoqueProdutoQuantidade - $1 WHERE ParceiroEstoqueID = $2',
      values: [HistoricoParceiroEmpresa.ProdutoQuantidade, parceiroestoqueid],
    };
    await client.query(updateParceiroEstoqueQuery);

    // 2. Atualiza a tabela Parceiro
    LocalERRO = '  SELECT PARCEIRO'
    const updateParceiroQuery = {
      text: 'UPDATE Parceiro SET ParceiroCreditoQuantidade = ParceiroCreditoQuantidade + $1 WHERE UsuarioID = $2',
      values: [HistoricoParceiroEmpresa.CreditoQuantidade, UsuarioID],
    };
    await client.query(updateParceiroQuery);


    const selectParceiroQuery = {
      text: 'SELECT parceiroID FROM parceiro WHERE UsuarioID = $1',
      values: [UsuarioID],
    };
    const ResultParceiroID = await client.query(selectParceiroQuery);
    const { parceiroid } = ResultParceiroID.rows[0];

    // 3. Insere na tabela HistoricoParceiroEmpresa
    LocalERRO = '  INSERT HistoricoParceiroEmpresa'
    const insertHistoricoParceiroEmpresaQuery = {
      text: 'INSERT INTO HistoricoParceiroEmpresa (EmpresaID, parceiroestoqueid, HistoricoParceiroEmpresaDescricao, HistoricoParceiroEmpresaProdutoDescricao, HistoricoParceiroEmpresaProdutoQuantidade, HistoricoParceiroEmpresaCreditoQuantidade, HistoricoParceiroEmpresaData) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [
        empresaid,
        parceiroestoqueid,
        HistoricoParceiroEmpresa.Descricao,
        HistoricoParceiroEmpresa.ProdutoDescricao,
        HistoricoParceiroEmpresa.ProdutoQuantidade,
        HistoricoParceiroEmpresa.CreditoQuantidade,
        HistoricoParceiroEmpresa.Data
      ],
    };
    await client.query(insertHistoricoParceiroEmpresaQuery);

    result.isSuccess = true;
    result.message = 'Operações realizadas com sucesso.';
  } catch (error) {
    result.message = 'Erro ao processar o histórico: ' + error.message + LocalERRO;
  }
  return result;
}

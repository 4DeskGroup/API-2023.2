import { GETParceiroEstoque } from '../GETs/GETParceiroEstoque';
import { SETParceiroEstoque } from '../SETs/SETParceiroEstoque';

const { Client } = require('pg');

export async function realizarTransacaoEstabelecimentoParceiro(client, UsuarioID, EstabelecimentoID, EstabelecimentoEstoqueID, transacaoEstabelecimentoParceiro) {
  try {

    let isSucesso = false

    // Obter o ParceiroID usando o UsuarioID
    const parceiroQuery = {
      text: 'SELECT ParceiroID FROM Parceiro WHERE UsuarioID = $1',
      values: [UsuarioID],
    };

    const parceiroResult = await client.query(parceiroQuery);
    const parceiroID = parceiroResult.rows[0].parceiroid;

    // Obter o EstabelecimentoID usando o EstabelecimentoEstoqueID
    // const estabelecimentoQuery = {
    //   text: 'SELECT EstabelecimentoID FROM Estabelecimento WHERE EstabelecimentoID = $1',
    //   values: [EstabelecimentoID],
    // };
    // const estabelecimentoResult = await client.query(estabelecimentoQuery);
    // const EstabelecimentoID = estabelecimentoResult.rows[0].estabelecimentoid;

    // Iniciar uma transação no banco de dados
    await client.query('BEGIN');

    // Inserir na tabela TransacaoEstabelecimentoParceiro
    const transacaoQuery = {
      text: `
        INSERT INTO TransacaoEstabelecimentoParceiro (
          ParceiroID,
          EstabelecimentoEstoqueID,
          TransacaoEstabelecimentoParceiroData,
          EstabelecimentoEstoqueProdutoDescricao,
          EstabelecimentoEstoqueTipo,
          EstabelecimentoEstoqueProdutoQuantidade,
          ParceiroCreditoQuantidade
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      values: [
        parceiroID,
        EstabelecimentoEstoqueID,
        transacaoEstabelecimentoParceiro.TransacaoEstabelecimentoParceiroData,
        transacaoEstabelecimentoParceiro.EstabelecimentoEstoqueProdutoDescricao,
        transacaoEstabelecimentoParceiro.EstabelecimentoEstoqueTipo,
        transacaoEstabelecimentoParceiro.EstabelecimentoEstoqueProdutoQuantidade,
        transacaoEstabelecimentoParceiro.ParceiroCreditoQuantidade,
      ],
    };
    await client.query(transacaoQuery);

    // Atualizar a tabela Parceiro
    const updateParceiroQuery = {
      text: `
        UPDATE Parceiro
        SET ParceiroCreditoQuantidade = ParceiroCreditoQuantidade - $1
        WHERE ParceiroID = $2
      `,
      values: [
        transacaoEstabelecimentoParceiro.ParceiroCreditoQuantidade,
        parceiroID,
      ],
    };

    await client.query(updateParceiroQuery);

    // Atualizar a quantidade de estoque no Estabelecimento
    const updateEstoqueQuery = {
      text: `
        UPDATE EstabelecimentoEstoque
        SET EstabelecimentoEstoqueProdutoQuantidade = EstabelecimentoEstoqueProdutoQuantidade - $1
        WHERE EstabelecimentoEstoqueID = $2
      `,
      values: [
        transacaoEstabelecimentoParceiro.EstabelecimentoEstoqueProdutoQuantidade,
        EstabelecimentoEstoqueID,
      ],
    };
    await client.query(updateEstoqueQuery);

    // Atualizar a quantidade de créditos no Estabelecimento
    const updateCreditoEstabelecimentoQuery = {
      text: `
        UPDATE Estabelecimento
        SET EstabelecimentoCreditoQuantidade = EstabelecimentoCreditoQuantidade + $1
        WHERE EstabelecimentoID = $2
      `,
      values: [
        transacaoEstabelecimentoParceiro.ParceiroCreditoQuantidade,
        EstabelecimentoID,
      ],
    };

    await client.query(updateCreditoEstabelecimentoQuery);

    await client.query('COMMIT');
    console.log('Transação realizada com sucesso.');

    const retornoParceiroEstoque = await GETParceiroEstoque(client, parceiroID)
    console.log(JSON.stringify(retornoParceiroEstoque))

    if (!retornoParceiroEstoque.isSucesso) {
      const parceiroEstoque = {
        ParceiroID: parceiroID,
        ParceiroEstoqueProdutoDescricao: transacaoEstabelecimentoParceiro.EstabelecimentoEstoqueProdutoDescricao,
        ParceiroEstoqueTipo: transacaoEstabelecimentoParceiro.EstabelecimentoEstoqueTipo,
        ParceiroEstoqueProdutoQuantidade: transacaoEstabelecimentoParceiro.EstabelecimentoEstoqueProdutoQuantidade
      }

      const retorno = await SETParceiroEstoque(client, parceiroEstoque)
      isSucesso = retorno.isSucesso

    } else {
      const parceiroEstoque = {
        ParceiroEstoqueID: retornoParceiroEstoque.parceiroEstoque.ParceiroEstoqueID,
        ParceiroID: parceiroID,
        ParceiroEstoqueProdutoDescricao: transacaoEstabelecimentoParceiro.EstabelecimentoEstoqueProdutoDescricao,
        ParceiroEstoqueTipo: transacaoEstabelecimentoParceiro.EstabelecimentoEstoqueTipo,
        ParceiroEstoqueProdutoQuantidade: transacaoEstabelecimentoParceiro.EstabelecimentoEstoqueProdutoQuantidade
      }

      const retorno = await SETParceiroEstoque(client, parceiroEstoque)
      isSucesso = retorno.isSucesso

    }


    return { isSucesso, mensagem: isSucesso ? 'Transação realizada com sucesso.' : 'Erro ao realizar a transação.' };

  } catch (error) {
    // Rollback em caso de erro
    await client.query('ROLLBACK');
    console.error('Erro ao realizar a transação:', error);
  }
}
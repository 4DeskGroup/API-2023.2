import { GETParceiroEstoque } from '../GETs/GETParceiroEstoque';
import { SETParceiroEstoque } from '../SETs/SETParceiroEstoque';

const { Client } = require('pg');

export async function POSTEmpresaCompraOleoParceiro(client, UsuarioID, ParceiroID, ParceiroEstoqueID, transacaoEmpresaParceiro) {
  let isSucesso = false;
  let LOCALERRO = 'GETEmpresa';

  try {
    const EmpresaQuery = {
      text: 'SELECT EmpresaID FROM Empresa WHERE UsuarioID = $1',
      values: [UsuarioID],
    };
    const GETEmpresaResult = await client.query(EmpresaQuery);
    const EmpresaID = GETEmpresaResult.rows[0].empresaid;

    const GETParceiroEstoque = {
      text: `SELECT ParceiroEstoqueProdutoQuantidade FROM ParceiroEstoque WHERE ParceiroEstoqueID = $1`,
      values: [ParceiroEstoqueID],
    };
    const GETParceiroEstoqueResult = await client.query(GETParceiroEstoque);

    if (GETParceiroEstoqueResult.rows.length > 0) {
      const ParceiroEstoqueQuantidade = GETParceiroEstoqueResult.rows[0].parceiroestoqueprodutoquantidade;

      if (ParceiroEstoqueQuantidade >= transacaoEmpresaParceiro.ParceiroEstoqueProdutoQuantidade) {
        // Iniciar uma transação no banco de dados
        await client.query('BEGIN');

        LOCALERRO = 'INSERT HISTORICO';

        const insertQuery = `
          INSERT INTO HistoricoParceiroEmpresa (
            EmpresaID,
            ParceiroID,
            ParceiroEstoqueID,
            HistoricoParceiroEmpresaData,
            HistoricoParceiroEmpresaDescricao,
            HistoricoParceiroEmpresaProdutoDescricao,
            HistoricoParceiroEmpresaProdutoQuantidade,
            HistoricoParceiroEmpresaCreditoQuantidade,
            HistoricoParceiroEmpresaTipoTransacao
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;
        const insertValues = [
          EmpresaID,
          ParceiroID,
          ParceiroEstoqueID,
          transacaoEmpresaParceiro.TransacaoEmpresaParceiroData,
          'Transação entre empresa e parceiro, empresa compra óleo',
          transacaoEmpresaParceiro.ParceiroEstoqueProdutoDescricao,
          transacaoEmpresaParceiro.ParceiroEstoqueProdutoQuantidade,
          transacaoEmpresaParceiro.ParceiroCreditoQuantidade,
          'EmpresaCompraOleo',
        ];
        await client.query(insertQuery, insertValues);

        LOCALERRO = 'GETEmpresaEstoque';

        const GETEmpresaEstoque = {
          text: `SELECT empresaestoqueid FROM EmpresaEstoque WHERE EmpresaEstoqueEstoqueTipo = $1 and EmpresaID = $2`,
          values: [transacaoEmpresaParceiro.EstoqueTipo, EmpresaID],
        };
        const GETEmpresaEstoqueResult = await client.query(GETEmpresaEstoque);

        if (GETEmpresaEstoqueResult.rows.length > 0) {
          const EmpresaEstoqueID = GETEmpresaEstoqueResult.rows[0].empresaestoqueid;

          if (EmpresaEstoqueID) {
            LOCALERRO = 'UPDATEEmpresaEstoque';

            const updateEstoqueEmpresaQuery = {
              text: `
                UPDATE EmpresaEstoque
                SET EmpresaEstoqueEstoqueProdutoQuantidade = EmpresaEstoqueEstoqueProdutoQuantidade + $1
                WHERE EmpresaEstoqueID = $2
              `,
              values: [
                transacaoEmpresaParceiro.ParceiroEstoqueProdutoQuantidade,
                EmpresaEstoqueID,
              ],
            };
            await client.query(updateEstoqueEmpresaQuery);
          } else {
            LOCALERRO = 'InsertEmpresaEstoque';

            const insertEmpresaEstoqueQuery = `
              INSERT INTO EmpresaEstoque (
                EmpresaID,
                EmpresaEstoqueEstoqueProdutoDescricao,
                EmpresaEstoqueEstoqueTipo,
                EmpresaEstoqueEstoqueProdutoQuantidade
              )
              VALUES ($1, $2, $3, $4)
            `;
            const insertEmpresaEstoqueValues = [
              EmpresaID,
              transacaoEmpresaParceiro.ParceiroEstoqueProdutoDescricao,
              transacaoEmpresaParceiro.EstoqueTipo,
              transacaoEmpresaParceiro.ParceiroEstoqueProdutoQuantidade,
            ];
            await client.query(insertEmpresaEstoqueQuery, insertEmpresaEstoqueValues);
          }
        } else {
          LOCALERRO = 'InsertEmpresaEstoque outro else';

          const insertEmpresaEstoqueQuery = `
            INSERT INTO EmpresaEstoque (
              EmpresaID,
              EmpresaEstoqueEstoqueProdutoDescricao,
              EmpresaEstoqueEstoqueTipo,
              EmpresaEstoqueEstoqueProdutoQuantidade
            )
            VALUES ($1, $2, $3, $4)
          `;
          const insertEmpresaEstoqueValues = [
            EmpresaID,
            transacaoEmpresaParceiro.ParceiroEstoqueProdutoDescricao,
            transacaoEmpresaParceiro.EstoqueTipo,
            transacaoEmpresaParceiro.ParceiroEstoqueProdutoQuantidade,
          ];
          await client.query(insertEmpresaEstoqueQuery, insertEmpresaEstoqueValues);
        }

        LOCALERRO = 'Update PARCEIRO ESTOQUE';

        const updateEstoqueQuery = {
          text: `
            UPDATE ParceiroEstoque
            SET ParceiroEstoqueProdutoQuantidade = ParceiroEstoqueProdutoQuantidade - $1
            WHERE ParceiroEstoqueID = $2
          `,
          values: [
            transacaoEmpresaParceiro.ParceiroEstoqueProdutoQuantidade,
            ParceiroEstoqueID,
          ],
        };
        await client.query(updateEstoqueQuery);

        LOCALERRO = 'GET PARCEIRO CREDITO';
        const GETParceiroCreditoQuery2 = {
          text: `
            SELECT ParceiroCreditoQuantidade from Parceiro where ParceiroID = $1
          `,
          values: [
            ParceiroID,
          ],
        };
        const resultGETParceiroQuantidadeCredito = await client.query(GETParceiroCreditoQuery2);
        const parceiroquantidadecredito = resultGETParceiroQuantidadeCredito.rows[0].parceirocreditoquantidade;

        LOCALERRO = 'UPDATE PARCEIRO CREDITO';
        const novaQuantidade = parseFloat(parceiroquantidadecredito) + parseFloat(transacaoEmpresaParceiro.ParceiroCreditoQuantidade);

        const updateParceiroQuery = {
          text: 'UPDATE Parceiro SET ParceiroCreditoQuantidade = $1 WHERE ParceiroID = $2',
          values: [novaQuantidade, ParceiroID],
        };
      
        await client.query(updateParceiroQuery);

        await client.query('COMMIT');
        isSucesso = true;
        return { isSucesso, mensagem: 'Transação realizada com sucesso.' };
      } else {
        isSucesso = false;
        return { isSucesso, mensagem: 'Erro ao verificar o estoque do parceiro.' };
      }
    }
  } catch (error) {
    // Rollback em caso de erro
    await client.query('ROLLBACK');
    console.error('Erro ao realizar a transação:', error + '   ---   ' + LOCALERRO);
    isSucesso = false;
    return { isSucesso, mensagem: 'Erro ao realizar a transação.' };
  }
}

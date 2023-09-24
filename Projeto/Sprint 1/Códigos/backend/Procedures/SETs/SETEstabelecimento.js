import { Pool } from "pg";
import prcDebug from "../../debug/PRCDebug";

export async function SETEstabelecimento(client, estabelecimento) {
    await client.connect()

    try {

        let isSucesso = false

        const SQL = "INSERT INTO Estabelecimento (UsuarioID, EstabelecimentoNomeFantasia, EstabelecimentoNomeCompleto, EstabelecimentoResponsavel, EstabelecimentoCNPJ, EstabelecimentoDataCadastro, EstabelecimentoVolumeOleoMensal, EstabelecimentoEndereco, EstabelecimentoEnderecoNumero, EstabelecimentoBairro, EstabelecimentoCidade, EstabelecimentoUF, EstabelecimentoPrincipaisParceiros) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING EstabelecimentoID"

        const values = [
            estabelecimento.UsuarioID,
            estabelecimento.EstabelecimentoNomeFantasia,
            estabelecimento.EstabelecimentoNomeCompleto,
            estabelecimento.EstabelecimentoResponsavel,
            estabelecimento.EstabelecimentoCNPJ,
            estabelecimento.EstabelecimentoDataCadastro,
            estabelecimento.EstabelecimentoVolumeOleoMensal,
            estabelecimento.EstabelecimentoEndereco,
            estabelecimento.EstabelecimentoEnderecoNumero,
            estabelecimento.EstabelecimentoBairro,
            estabelecimento.EstabelecimentoCidade,
            estabelecimento.EstabelecimentoUF,
            estabelecimento.EstabelecimentoPrincipaisParceiros
        ];

        const result = await client.query(SQL, values);
        if (result) {
            console.log(`Estabelecimento inserido com sucesso. ID: ${result.rows[0].estabelecimentoid}`);
            prcDebug("EstabelecimentoID - ", result.rows[0].estabelecimentoid)
            const id = result.rows[0].estabelecimentoid
            isSucesso = true
        }


        return { id, isSucesso };

    } catch (error) {
        console.error('Erro ao inserir estabelecimento:', error);
        throw error;
    }
}
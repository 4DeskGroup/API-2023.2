export async function GETListaEstabelecimento(client) {
    try {
      const SQL = 'SELECT * FROM Estabelecimento';
      const result = await client.query(SQL);
  
      let isSucesso = false;
      let retornoEstabs = [];
  
      if (result.rows.length > 0) {
        for (const estabEncontrado of result.rows) {
          const estabelecimento = {
            UsuarioID: estabEncontrado.usuarioid,
            EstabelecimentoNomeFantasia: estabEncontrado.estabelecimentonomefantasia,
            EstabelecimentoNomeCompleto: estabEncontrado.estabelecimentonomecompleto,
            EstabelecimentoResponsavel: estabEncontrado.estabelecimentoresponsavel,
            EstabelecimentoDataCadastro: estabEncontrado.estabelecimentodatacadastro,
            EstabelecimentoCNPJ: estabEncontrado.estabelecimentocnpj,
            EstabelecimentoVolumeOleoMensal: estabEncontrado.estabelecimentovolumeoleomensal,
            EstabelecimentoEndereco: estabEncontrado.estabelecimentoendereco,
            EstabelecimentoEnderecoNumero: estabEncontrado.estabelecimentoendereconumero,
            EstabelecimentoBairro: estabEncontrado.estabelecimentobairro,
            EstabelecimentoCidade: estabEncontrado.estabelecimentocidade,
            EstabelecimentoUF: estabEncontrado.estabelecimentouf,
            EstabelecimentoPrincipaisParceiros: estabEncontrado.estabelecimentoprincipaisparceiros,
            EstabelecimentoCreditoQuantidade: estabEncontrado.estabelecimentocreditoquantidade,
          };
          retornoEstabs.push(estabelecimento);
        }
  
        isSucesso = true;
        return { isSucesso, retornoEstabs };
      }
  
      return { isSucesso, retornoEstabs };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
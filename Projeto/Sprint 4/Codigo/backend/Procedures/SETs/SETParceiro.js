const { Pool } = require('pg');

export async function SETParceiro(client, parceiro) {
  // await client.connect();

  try {

    let isSucesso = false

    const query = `
      INSERT INTO Parceiro (UsuarioID, ParceiroNomeFantasia, ParceiroNomeCompleto, ParceiroResponsavel, ParceiroDataCadastro, ParceiroCNPJ, ParceiroVolumeOleoMensal, ParceiroEndereco, ParceiroEnderecoNumero, ParceiroBairro, ParceiroCidade, ParceiroUF, ParceiroCidadesAtendimento, ParceiroPrincipaisParceiros)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING ParceiroID;`;
    
    const values = [
      parceiro.UsuarioID,
      parceiro.ParceiroNomeFantasia,
      parceiro.ParceiroNomeCompleto,
      parceiro.ParceiroResponsavel,
      parceiro.ParceiroDataCadastro,
      parceiro.ParceiroCNPJ,
      parceiro.ParceiroVolumeOleoMensal,
      parceiro.ParceiroEndereco,
      parceiro.ParceiroEnderecoNumero,
      parceiro.ParceiroBairro,
      parceiro.ParceiroCidade,
      parceiro.ParceiroUF,
      parceiro.ParceiroCidadesAtendimento,
      parceiro.ParceiroPrincipaisParceiros
    ];

    const result =  await client.query(query, values);
    if (result) {
      console.log(`Parceiro inserido com sucesso. ID: ${result.rows[0].parceiroid}`);
      const id = result.rows[0].parceiroid
      isSucesso = true
      
    }
    
    return { id, isSucesso};
    
  } catch (error) {
    console.error('Erro ao inserir parceiro:', error);
    throw error;
  }
}
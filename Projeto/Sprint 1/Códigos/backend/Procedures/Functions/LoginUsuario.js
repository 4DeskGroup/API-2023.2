const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// Função para buscar um usuário pelo email


async function validarSenha(senhaUsuario, senhaLogin) {
    try {
      // console.log(senhaUsuario)
      const senhaValida = await bcrypt.compare(senhaLogin, senhaUsuario);
      return senhaValida;
    } catch (error) {
      throw error;
    }
  }
  
  export async function LoginUsuario(client, usuario) {
    try {
      const query = 'SELECT * FROM Usuario WHERE UsuarioEmail = $1';
      const values = [usuario.UsuarioEmail];
      const result = await client.query(query, values);
  
      let isSucesso = false;
      let messages = '';
      let usuarioReturn = null;
  
      if (result.rows.length > 0) {
        const usuarioEncontrado = result.rows[0];
        // console.log(usuarioEncontrado)
        const senhaUser = result.rows.values().next().value.usuariosenha;
        // console.log(senhaUser)
  
        const senhaValida = await validarSenha(senhaUser, usuario.UsuarioSenha);
  
        if (senhaValida) {
          messages = 'Senha válida. Usuário autenticado.';
          usuarioReturn = {
            UsuarioID: usuarioEncontrado.usuarioid,
            UsuarioNome: usuarioEncontrado.usuarionome,
            UsuarioEmail: usuarioEncontrado.usuarioemail,
            UsuarioTipo: usuarioEncontrado.usuariotipo,
            UsuarioStatus: usuarioEncontrado.usuariostatusregistro,
          };
          isSucesso = true;
        } else {
          messages = 'Senha inválida. Autenticação falhou.';
          isSucesso = false;
        }
      } else {
        messages = 'Usuário não encontrado.';
      }
  
      return { isSucesso, messages, usuarioReturn };
    } catch (error) {
      throw error;
    }
  }
  
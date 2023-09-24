import { SETEstabelecimento } from "../SETs/SETEstabelecimento";
import { SETUsuario } from "../SETs/SETUsuario";

export async function POSTCadastroEstabelecimento(client, usuario, estabelecimento) {
    await client.connect();

    try {
        let isSucesso = false;
        let retonoUsuario = null;

        const resultado = await SETUsuario(client, usuario)

        if (resultado) {

            estabelecimento.UsuarioID = resultado.usuarioReturn.UsuarioID;
            console.log(estabelecimento.UsuarioID);

            const retorno = await SETEstabelecimento(client, estabelecimento);
            isSucesso = retorno.isSucesso
            const id = retorno.id
            
            retonoUsuario = {
                UsuarioID: resultado.usuarioReturn.UsuarioID,
                UsuarioNome: resultado.usuarioReturn.UsuarioNome,
                UsuarioEmail: resultado.usuarioReturn.UsuarioEmail,
                UsuarioTipo: resultado.usuarioReturn.UsuarioTipo,
                UsuarioStatus: resultado.usuarioReturn.UsuarioStatus,
            }

            return { id, isSucesso, retonoUsuario }
        }

        return { id: null, isSucesso: false };

    } catch (erro) {
        console.log("DEU RUIM: " + erro)
    }
}
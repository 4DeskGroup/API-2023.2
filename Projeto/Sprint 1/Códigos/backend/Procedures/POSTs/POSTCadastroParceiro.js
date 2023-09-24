import { SETParceiro } from "../SETs/SETParceiro";
import { SETUsuario } from "../SETs/SETUsuario";

export async function POSTCadastroParceiro(client, usuario, parceiro) {
    await client.connect();

    try {
        let isSucesso = false;
        let usuarioReturn = null;

        const retornoUsuario = await SETUsuario(client, usuario)

        if (retornoUsuario) {
            parceiro.UsuarioID = retornoUsuario.usuarioReturn.UsuarioID
            console.log(parceiro.UsuarioID)

            const retorno = await SETParceiro(client, parceiro)
            isSucesso = retorno.isSucesso
            const id = retorno.id

            usuarioReturn = {
                UsuarioID: retornoUsuario.usuarioReturn.UsuarioID,
                UsuarioNome: retornoUsuario.usuarioReturn.UsuarioNome,
                UsuarioEmail: retornoUsuario.usuarioReturn.UsuarioEmail,
                UsuarioTipo: retornoUsuario.usuarioReturn.UsuarioTipo,
                UsuarioStatus: retornoUsuario.usuarioReturn.UsuarioStatus,
            }

            return { id, isSucesso, usuarioReturn }

        }

        return { id: null, isSucesso: false };

    } catch (erro) {
        console.log("DEU RUIM: " + erro)
    }
}

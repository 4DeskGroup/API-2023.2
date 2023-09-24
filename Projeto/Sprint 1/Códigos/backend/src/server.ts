import { Pool } from "pg";
import express from "express"
import cors from "cors"
import { LoginUsuario } from "../Procedures/Functions/LoginUsuario";
import { POSTCadastroParceiro } from "../Procedures/POSTs/POSTCadastroParceiro";
import { POSTCadastroEstabelecimento } from "../Procedures/POSTs/POSTCadastroEstabelecimento";
import { enviarEmailComToken } from "../Procedures/Functions/SendEmail";
import { VerificaUserEmail } from "../Procedures/Functions/VerificaUserEmail";

const client = new Pool({
    user: "postgres",
    host: "localhost",
    database: "API - 4Desk",    //trocar para o nome do seu banco local
    password: "thygas020",      //trocar para a senha do seu banco local
    port: 5432
})

// const cloud = new Pool({ //conexão com o banco do servidor
//     connectionString: "postgres://foucqfeg:V-vXAAIje_4WXTk40Zs73_UCSc9gjInB@silly.db.elephantsql.com/foucqfeg", 
//     ssl: {
//         rejectUnauthorized: false
//     }
// })

const app = express()
app.use(cors())
app.use(express.json())

app.post("/login", async (req, res) => {

    const { email } = req.body
    const { password } = req.body

    const messages = ''
    const isSucesso = false
    const usuarioReturn = {
        UsuarioNome: "",
        UsuarioSenha: "",
        UsuarioEmail: "",
        UsuarioTipo: "",
        UsuarioDataCadastro: ""
    }

    const usuario = {
        UsuarioNome: "",
        UsuarioSenha: password,
        UsuarioEmail: email,
        UsuarioTipo: "",
        UsuarioDataCadastro: ""
    }

    const resultadoLogin = await LoginUsuario(client, usuario);

    if (resultadoLogin.isSucesso) {
        res.send({ msg: resultadoLogin.messages, usuario: resultadoLogin.usuarioReturn, isSucesso: resultadoLogin.isSucesso })
    } else {
        res.send({ msg: resultadoLogin.messages, usuario: resultadoLogin.usuarioReturn, isSucesso: resultadoLogin.isSucesso })
    }


})

app.post("/cadastro-parceiro", async (req, res) => {
    const { usuario } = req.body
    const { parceiro } = req.body
    
    const resultado = await POSTCadastroParceiro(client, usuario, parceiro)
    console.log(resultado?.isSucesso)

    if (resultado?.isSucesso) {
        res.send({ msg: "Usuário cadastrado com sucesso.", Sucesso: resultado.isSucesso, id: resultado.id, Usuario: resultado.usuarioReturn })
    } else {
        res.send({ msg: "Erro ao realizar o cadastro do usuário." })
    }
})

app.post("/cadastro-estabelecimento", async (req, res) => {
    const { usuario } = req.body
    const { estabelecimento } = req.body

    const resultado = await POSTCadastroEstabelecimento(client, usuario, estabelecimento)
    console.log(resultado?.isSucesso)

    if (resultado?.isSucesso) {
        res.send({ msg: "Usuário cadastrado com sucesso.", Sucesso: resultado.isSucesso, id: resultado.id, Usuario: resultado.retonoUsuario })
    } else {
        res.send({ msg: "Erro ao realizar o cadastro do usuário." })
    }
})

app.post("/sendEmail", async (req, res) => {

    const { email } = req.body;

    enviarEmailComToken(email)
        .then(result => {
            if (result.isSuccess) {
                res.send({ token: result.token, isSucesso: result.isSuccess, msg: result.messages[0] });
            } else {
                console.error('Erro:', result.messages[0]);
            }
        })
        .catch(error => console.error('Erro:', error));
})


app.post("/verifica-usuario", async (req, res) => {
    const { email } = req.body

    const emailValido = await VerificaUserEmail(client, email)

    if (emailValido) {
        res.send({msg: "Email já existente"})
    } else {
        res.send({msg: "Email válido para cadastro"})
    }

})

app.listen(3001, () => {
    console.log("Servidor rodando!")
})

import { Pool } from "pg";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { LoginUsuario } from "../Procedures/Functions/LoginUsuario";
import { POSTCadastroParceiro } from "../Procedures/POSTs/POSTCadastroParceiro";
import { POSTCadastroEstabelecimento } from "../Procedures/POSTs/POSTCadastroEstabelecimento";
import { enviarEmailComToken } from "../Procedures/Functions/SendEmail";
import { VerificaUserEmail } from "../Procedures/Functions/VerificaUserEmail";
import { GETParceiro } from "../Procedures/GETs/GETParceiro";
import { GETEstabelecimento } from "../Procedures/GETs/GETEstabelecimento";
import { realizarTransacaoEstabelecimentoParceiro } from "../Procedures/Functions/FuncaoDeTransacao";
import { GETEstabelecimentoEstoquePorTipo } from "../Procedures/GETs/GETEstabelecimentoEstoquePorTipoEstoque";
import { GETListaEstabelecimento } from "../Procedures/GETs/GETListaEstabelecimento";
import { GETEstabelecimentoEstoqueByUsuarioID } from "../Procedures/GETs/GETEstabelecimentoEstoqueByUsuarioID";
import { processarEstoque } from "../Procedures/POSTs/POSTEstabelecimentoEstoque";
import { GETEstabelecimentoByNomeFantasia } from "../Procedures/GETs/GETEstabelecimentoByNomeFantasia";
import { POSTEstabelecimentoEmpresa } from "../Procedures/POSTs/POSTEstabelecimentoEmpresa";
import { POSTParceiroEmpresa } from "../Procedures/POSTs/POSTHistoricoParceiroEmpresa";
import { GETListaParceiroEstoque } from "../Procedures/GETs/GETListaParceiroEstoque";
import { GETEstabelecimentoEstoqueHistorico } from "../Procedures/GETs/GETEstabelecimentoEstoqueHistorico";
import { GETEstabelecimentoEmpresaExtrato } from "../Procedures/GETs/GETEstabelecimentoEmpresaExtrato";
import { GETParceiroEstabelecimentoExtrato } from "../Procedures/GETs/GETParceiroEstabelecimentoExtrato";
import { GETParceiroEmpresaExtrato } from "../Procedures/GETs/GETParceiroEmpresaExtrato";
import { GETParceiroEstoqueHistorico } from "../Procedures/GETs/GETParceiroEstoqueHistorico";
import { POSTEnviarMoedaParceiroEmpresa } from "../Procedures/POSTs/POSTEnviarMoedaParceiroEmpresa";
import { GETParceiroEmpresaExtratoMoeda } from "../Procedures/GETs/GETParceiroEmpresaExtratoMoeda";
import { GETListaParceiroNomes } from "../Procedures/GETs/GETListaParceiroNomes";
import { POSTEmpresaEnviarMoedaParceiro } from "../Procedures/POSTs/POSTEmpresaEnviarMoedaParceiro";
import { GETEmpresaParceiroEmpresaEnviaMoeda } from "../Procedures/GETs/GETEmpresaParceiroEmpresaEnviaMoeda";
import { GETEmpresaParceiroEmpresaEnviaMoedaPorParceiro } from "../Procedures/GETs/GETEmpresaParceiroEmpresaEnviaMoedaPorParceiro";
import { PUTUsuarioSenha } from "../Procedures/PUTs/PUTUsuarioSenha";
import { PUTParceiro } from "../Procedures/PUTs/PUTParceiro";
import { GETParceiroEstoquePorTipo } from "../Procedures/GETs/GETParceiroEstoquePorTipoEstoque";
import { POSTEmpresaCompraOleoParceiro } from "../Procedures/Functions/POSTEmpresaCompraOleoParceiro";
import { GETListaEmpresaEstoque } from "../Procedures/GETs/GETListaEmpresaEstoque";
import { GETParceiroEmpresaEmpresaCompraOleo } from "../Procedures/GETs/GETParceiroEmpresaEmpresaCompraOleo";
import { GETHistoricosRecebimentosMoedas } from "../Procedures/GETs/GETHistoricosRecebimentosMoedas";
import { PUTEstabelecimento } from "../Procedures/PUTs/PUTEstabelecimento";
import { GETUsuarios } from "../Procedures/GETs/GETUsuarios";
import { DELUsuario } from "../Procedures/Deletes/DELUsuario";
import { PUTUsuarioStatusRegistro } from "../Procedures/PUTs/PUTUsuarioStatusRegistro";
import { GETListaParceiroTransacoes } from "../Procedures/GETs/GETParceirosTransacoes";
import { GETListaEstabelecimentosTransacoes } from "../Procedures/GETs/GETPEstabelecimentosTransacoes";
import { GETParceirosSistema } from "../Procedures/GETs/GETParceirosSistema";
import { GETEstabelecimentosSistema } from "../Procedures/GETs/GETEstabelecimentosSistema";
import { GETTopParceiro } from "../Procedures/GETs/GETTopParceiros";
import { GETParceiroPorEstado } from "../Procedures/GETs/GETParceiroPorEstado";
import { GETEstabelecimentoPorEstado } from "../Procedures/GETs/GETEstabelecimentoPorEstado";
import { POSTParametro } from "../Procedures/POSTs/POSTParametro";
import { GETParametroPorNome } from "../Procedures/GETs/GETParametroPorNome";
import { GETHistoricoParametro } from "../Procedures/GETs/GETHistoricoParametro";

dotenv.config()

const client = new Pool({
    user: "postgres",
    host: "localhost",
    database: "API - 4Desk",    //trocar para o nome do seu banco local
    password: "thygas020",      //trocar para a senha do seu banco local
    port: 5432
})

// const client = new Pool({ //conexão com o banco do servidor
//     connectionString: process.env.URLCloud, 
//     ssl: {
//         rejectUnauthorized: false
//     }
// })

client.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco estabelecida com sucesso!');
})

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
        res.send({ msg: "Email já existente" })
    } else {
        res.send({ msg: "Email válido para cadastro" })
    }

})

app.get("/recupera-credito-parceiro/:usuarioID", async (req, res) => {
    const { usuarioID } = req.params

    const retorno = await GETParceiro(client, usuarioID)

    if (retorno?.isSucesso) {
        res.send({ Sucesso: retorno.isSucesso, ParceiroCredito: retorno.retornoParceiro.ParceiroCreditoQuantidade, ParceiroInfo: retorno.retornoParceiro})
    } else {
        res.send({ msg: "Deu ruim" })
    }
})

app.get("/recupera-credito-estabelecimento/:usuarioID", async (req, res) => {
    const { usuarioID } = req.params

    const retorno = await GETEstabelecimento(client, usuarioID)

    if (retorno?.isSucesso) {
        res.send({ Sucesso: retorno.isSucesso, EstabCredito: retorno.retornoEstab.EstabelecimentoCreditoQuantidade })
    } else {
        res.send({ msg: "Deu ruim" })
    }
})

app.get("/GETEstabelecimentoByNomeFantasia/:nomeFantasia", async (req, res) => {
    const { nomeFantasia } = req.params

    const retorno = await GETEstabelecimentoByNomeFantasia(client, nomeFantasia)

    if (retorno?.isSucesso) {
        res.send({ Sucesso: retorno.isSucesso, Estabelecimento: retorno.retornoEstab })
    } else {
        res.send({ msg: "Deu ruim" })
    }
})

app.post("/POSTTransacaoParceiroEstabelecimento", async (req, res) => {
    const { transacaoEstabelecimentoParceiro } = req.body
    const { EstabelecimentoID } = req.body
    const { EstabelecimentoEstoqueID } = req.body
    const { UsuarioID } = req.body

    const returnTRN = await realizarTransacaoEstabelecimentoParceiro(client, UsuarioID, EstabelecimentoID, EstabelecimentoEstoqueID, transacaoEstabelecimentoParceiro)

    if (returnTRN?.isSucesso) {
        res.send({ Sucesso: returnTRN.isSucesso, msg: returnTRN.mensagem })
    }
})

app.get("/GETEstabelecimentoEstoquePorTipo/:estabelecimentoID/:estoqueTipo", async (req, res) => {
    const { estabelecimentoID } = req.params
    const { estoqueTipo } = req.params

    const retornoEstabEstoque = await GETEstabelecimentoEstoquePorTipo(client, estabelecimentoID, estoqueTipo)

    if (retornoEstabEstoque) {
        res.send({ EstabelecimentoEstoque: retornoEstabEstoque?.retornoEstabEstoque, msg: retornoEstabEstoque.isSucesso ? "Sucesso" : "Deu ruim."})
    } else {
        console.log('Nenhum estoque encontrado.');
    }
})

app.get("/recupera-estabelecimentos", async (req, res) => {

    const resultEstabelecimentos = await GETListaEstabelecimento(client)

    if (resultEstabelecimentos.isSucesso) {
        res.send({ Estabelecimentos: resultEstabelecimentos.retornoEstabs });
    } else {
        console.log('Nenhum estabelecimento encontrado.');
    }

})

app.get("/recupera-parceiros", async (req, res) => {

    const resultParceiros = await GETListaParceiroNomes(client)

    if (resultParceiros.isSucesso) {
        res.send({ Parceiros: resultParceiros });
        // console.log('RESULTADO DO GET PARCEIROS: '+JSON.stringify(resultParceiros));
        
    } else {
        console.log('Nenhum estabelecimento encontrado.');
    }

})

app.get("/GETEstabelecimentoEstoqueByUsuarioID/:usuarioID", async (req, res) => {

    const { usuarioID } = req.params

    GETEstabelecimentoEstoqueByUsuarioID(client, usuarioID)

        .then(estoque => {

            var EstabelecimentoEstoque = JSON.stringify(estoque)

            res.send({ msg: 'GET com sucesso', EstabelecimentoEstoque: EstabelecimentoEstoque })
        })
        .catch(error => console.error('Erro ao obter o estoque:', error));
})

app.post("/POSTEstabelecimentoEstoque", async (req, res) => {
    const { EstabelecimentoEstoque } = req.body
    const { usuarioID } = req.body


    const returnPOST = await processarEstoque(client, usuarioID, EstabelecimentoEstoque)
    res.send({ isSucesso: returnPOST })
})

app.post("/POSTEstabelecimentoEmpresa", async (req, res) => {

    const { empresanome } = req.body
    const { usuarioID } = req.body
    const { transacaoEstabelecimentoEmpresa } = req.body

    // await POSTEstabelecimentoEmpresa(client, empresaID, usuarioID, transacaoEstabelecimentoEmpresa)
    const returnPOST = await POSTEstabelecimentoEmpresa(client, empresanome.label, usuarioID, transacaoEstabelecimentoEmpresa)
    res.send({isSucesso:returnPOST.IsSucesso, msgErro: returnPOST.mensagensErro, msgSucesso: returnPOST.mensagensSucesso })
    
    
})


app.get("/GETListaParceiroEstoque/:usuarioID", async (req, res) => {
    const { usuarioID } = req.params

    const retornoParceiroEstoque = await GETListaParceiroEstoque(client, usuarioID)
    if (retornoParceiroEstoque) {
        res.send({ ParceiroEstoque: retornoParceiroEstoque?.retornoEstabEstoqueJSON, msg: retornoParceiroEstoque.isSucesso ? "Sucesso" : "Deu ruim."})
    } else {
        console.log('Nenhum estoque encontrado.');
    }
})

app.post("/POSTParceiroEmpresa", async (req, res) => {

    const { empresanome } = req.body
    const { usuarioID } = req.body
    const { ParceiroEstoqueTipo } = req.body
    const { HistoricoParceiroEmpresa } = req.body
    
    const returnPOST = await POSTParceiroEmpresa(client, usuarioID, ParceiroEstoqueTipo, empresanome.label, HistoricoParceiroEmpresa)
    res.send({isSucesso:returnPOST.isSuccess, msg: returnPOST.message })
    if(!returnPOST.isSuccess){
        console.log('ERRO POSTParceiroEmpresa: '+returnPOST.message);
    }

})

app.get("/GETEstabelecimentoEstoqueHistorico/:usuarioID", async (req, res)=>{

    const { usuarioID } = req.params

    GETEstabelecimentoEstoqueHistorico(client,usuarioID)
    
      .then(estoqueHis =>{
        
        var EstabelecimentoEstoqueHist = JSON.stringify(estoqueHis)
        // console.log('Historico   '+EstabelecimentoEstoqueHist)

        res.send({msg:'GET com sucesso', EstabelecimentoEstoqueHist:EstabelecimentoEstoqueHist})
      } )
      .catch(error => console.error('Erro ao obter o histórico do estoque:', error));
})

app.get("/GETEstabelecimentoEmpresaExtrato/:usuarioID", async (req, res)=>{

    const { usuarioID } = req.params
    
    GETEstabelecimentoEmpresaExtrato(client,usuarioID)
    
      .then(estabEmpresaExtrato =>{
        
        var EstabelecimentoEmpresaExtrato = JSON.stringify(estabEmpresaExtrato)
        // console.log('Historico   '+ EstabelecimentoEmpresaExtrato)

        res.send({msg:'GET com sucesso', EstabelecimentoEmpresaExtrato:EstabelecimentoEmpresaExtrato})
      } )
      .catch(error => console.error('Erro ao obter o extrato do estab empresa:', error));
})

app.get("/GETParceiroEstabelecimentoExtrato/:usuarioID", async (req, res)=>{

    const { usuarioID } = req.params
    
    GETParceiroEstabelecimentoExtrato(client,usuarioID)
    
      .then(parcEstabExtrato =>{
        
        var ParceiroEstabelecimentoExtrato = JSON.stringify(parcEstabExtrato)
        // console.log('Historico   '+ ParceiroEstabelecimentoExtrato)

        res.send({msg:'GET com sucesso', ParceiroEstabelecimentoExtrato:ParceiroEstabelecimentoExtrato})
      } )
      .catch(error => console.error('Erro ao obter o extrato do parc estab:', error));
})

app.get("/GETParceiroEmpresaExtrato/:usuarioID", async (req, res)=>{

    const { usuarioID } = req.params
    
    GETParceiroEmpresaExtrato(client,usuarioID)
    
      .then(parcEmpresaExtrato =>{
        
        var ParceiroEmpresaExtrato = JSON.stringify(parcEmpresaExtrato)
        // console.log('Historico parceiro e empresa   '+ ParceiroEmpresaExtrato)

        res.send({msg:'GET com sucesso', ParceiroEmpresaExtrato:ParceiroEmpresaExtrato})
      } )
      .catch(error => console.error('Erro ao obter o extrato do parc empresa:', error));
})


app.get("/GETParceiroEmpresaExtratoMoeda/:usuarioID", async (req, res)=>{

    const { usuarioID } = req.params
    
    GETParceiroEmpresaExtratoMoeda(client,usuarioID)
    
      .then(parcEmpresaExtrato =>{
        
        var ParceiroEmpresaExtrato = JSON.stringify(parcEmpresaExtrato)
        // console.log('Historico parceiro e empresa   '+ ParceiroEmpresaExtrato)

        res.send({msg:'GET com sucesso', ParceiroEmpresaExtrato:ParceiroEmpresaExtrato})
      } )
      .catch(error => console.error('Erro ao obter o extrato do parc empresa:', error));
})

app.get("/GETParceiroEstoqueHistorico/:usuarioID", async (req, res)=>{

    const { usuarioID } = req.params
    
    GETParceiroEstoqueHistorico(client,usuarioID)
    
      .then(parcEstoque =>{
        
        var ParceiroEstoque = JSON.stringify(parcEstoque)
        // console.log('Historico parceiro estoque   '+ ParceiroEstoque)

        res.send({msg:'GET com sucesso', ParceiroEstoque:ParceiroEstoque})
      } )
      .catch(error => console.error('Erro ao obter o historico do parceiro:', error));
})

app.post('/POSTEnviarMoedaParceiroEmpresa', async (req, res)=>{
    const { usuarioID } =  req.body
    const { empresanome } = req.body
    const { historicoParceiroEmpresa } = req.body

    const returnPOSTEnvia = POSTEnviarMoedaParceiroEmpresa(client, empresanome.label, historicoParceiroEmpresa, usuarioID)
    res.send({msg: (await returnPOSTEnvia).mensagem, isSucesso: (await returnPOSTEnvia).isSucesso})
    // console.log((await returnPOSTEnvia).mensagem);
    
})

app.post('/POSTEmpresaEnviarMoedaParceiro', async (req, res)=>{
    const { usuarioID } =  req.body
    const { parceironome } = req.body
    const { HistoricoParceiroEmpresa } = req.body

    const returnPOSTEnvia = POSTEmpresaEnviarMoedaParceiro(client, parceironome.parceiroNomefantasia, HistoricoParceiroEmpresa, usuarioID)
    res.send({msg: (await returnPOSTEnvia).mensagem, isSucesso: (await returnPOSTEnvia).isSucesso})
    // console.log((await returnPOSTEnvia).mensagem);
    
})

app.get("/GETListaParceiroNomes", async (req, res) => {

    const retornoParceiroNomes = await GETListaParceiroNomes(client)
    
    if (retornoParceiroNomes) {
        res.send({ ParceiroNomes: JSON.stringify(retornoParceiroNomes)})
    } else {
        console.log('Nenhum parceiro encontrado.');
    }
})

app.get("/GETEmpresaParceiroEmpresaEnviaMoeda/:usuarioID", async (req, res)=>{

    const { usuarioID } = req.params
    
    GETEmpresaParceiroEmpresaEnviaMoeda(client,usuarioID)
    
      .then(parcEmpresaExtrato =>{
        
        var ParceiroEmpresaExtrato = JSON.stringify(parcEmpresaExtrato)
        // console.log('Historico parceiro e empresa   '+ ParceiroEmpresaExtrato)

        res.send({msg:'GET com sucesso', ParceiroEmpresaExtrato:ParceiroEmpresaExtrato})
      } )
      .catch(error => console.error('Erro ao obter o extrato do parc empresa:', error));
})

app.get("/GETEmpresaParceiroEmpresaEnviaMoedaPorParceiro/:usuarioID", async (req, res)=>{

    const { usuarioID } = req.params
    
    GETEmpresaParceiroEmpresaEnviaMoedaPorParceiro(client,usuarioID)
    
      .then(parcEmpresaExtrato =>{
        
        var ParceiroEmpresaExtrato = JSON.stringify(parcEmpresaExtrato)
        // console.log('Historico parceiro e empresa   '+ ParceiroEmpresaExtrato)

        res.send({msg:'GET com sucesso', ParceiroEmpresaExtrato:ParceiroEmpresaExtrato})
      } )
      .catch(error => console.error('Erro ao obter o extrato do parc empresa:', error));
})

app.put("/alterarSenha", async (req, res) => {
    const { usuarioID } = req.body
    const { novaSenha } = req.body

    const resultado = await PUTUsuarioSenha(client, usuarioID, novaSenha)

    if (resultado?.isSucesso) {
        res.send({ msg: "Senha atualizada com sucesso.", Sucesso: resultado.isSucesso})
    } else {
        console.log({msg: "Erro ao atualizar senha.", Sucesso: false, resultado: resultado})
        res.send({msg: "Erro ao atualizar senha.", Sucesso: false})
    }

})

app.put("/editarUsuarioParceiro", async (req, res) => {
    const { parceiroInfo } = req.body
    const { usuarioID } = req.body

    const resultado = await PUTParceiro(client, usuarioID, parceiroInfo)

    if (resultado?.isSucesso) {
        res.send({ msg: "Suas informações foram atualizada com sucesso.", Sucesso: resultado.isSucesso})
    } else {
        res.send({msg: "Erro ao atualizar parceiro.", Sucesso: false})
    }

})

app.put("/editarUsuarioEstabelecimento", async (req, res) => {
    const { estabelecimentoInfo } = req.body
    const { usuarioID } = req.body

    const resultado = await PUTEstabelecimento(client, usuarioID, estabelecimentoInfo)

    if (resultado?.isSucesso) {
        res.send({ msg: "Suas informações foram atualizada com sucesso.", Sucesso: resultado.isSucesso})
    } else {
        console.log({msg: "Erro ao atualizar estabelecimento.", Sucesso: false})
        res.send({msg: "Erro ao atualizar estabelecimento.", Sucesso: false})
    }

})

app.get("/GETParceiroEstoquePorTipo/:parceironome/:estoqueTipo", async (req, res) => {
    const { parceironome } = req.params
    const { estoqueTipo } = req.params

    const retornoParcEstoque = await GETParceiroEstoquePorTipo(client, parceironome, estoqueTipo)

    if (retornoParcEstoque) {
        res.send({ ParceiroEstoque: retornoParcEstoque?.retornoParcEstoque, msg: retornoParcEstoque.isSucesso ? "Sucesso" : "Deu ruim."})
    } else {
        console.log('Nenhum estoque encontrado.');
    }
})

app.post("/POSTEmpresaCompraOleoParceiro", async (req, res) => {
    const { ParceiroID } = req.body
    const { ParceiroEstoqueID } = req.body
    const { transacaoEmpresaParceiro } = req.body
    const { UsuarioID } = req.body

    const returnTRN = await POSTEmpresaCompraOleoParceiro(client, UsuarioID, ParceiroID, ParceiroEstoqueID, transacaoEmpresaParceiro)
    
    if (returnTRN?.isSucesso) {
        res.send({ Sucesso: returnTRN.isSucesso, msg: returnTRN.mensagem })
    }
})



app.get("/GETListaEmpresaEstoque/:usuarioID", async (req, res) => {
    const { usuarioID } = req.params

    const retornoEmpresaEstoque = await GETListaEmpresaEstoque(client, usuarioID)
    if (retornoEmpresaEstoque) {
        res.send({ EmpresaEstoque: retornoEmpresaEstoque?.retornoEmpresaEstoqueJSON, msg: retornoEmpresaEstoque.isSucesso ? "Sucesso" : "Deu ruim."})
    } else {
        console.log('Nenhum estoque encontrado.');
    }
})

app.get("/GETParceiroEmpresaCompraOleo/:usuarioID", async (req, res)=>{

    const { usuarioID } = req.params
    
    GETParceiroEmpresaEmpresaCompraOleo(client,usuarioID)
    
      .then(parcEmpresaExtrato =>{
        
        var ParceiroEmpresaExtrato = JSON.stringify(parcEmpresaExtrato)
        // console.log('Historico parceiro e empresa   '+ ParceiroEmpresaExtrato)

        res.send({msg:'GET com sucesso', ParceiroEmpresaExtrato:ParceiroEmpresaExtrato})
      } )
      .catch(error => console.error('Erro ao obter o extrato do parc empresa:', error));
})


app.get("/GETHistoricosRecebimentosMoedas/:usuarioID", async (req, res)=>{

    const { usuarioID } = req.params
    
    GETHistoricosRecebimentosMoedas(client,usuarioID)
      .then(parcEmpresaExtrato =>{
        
        
        var ParceiroEmpresaExtrato = JSON.stringify(parcEmpresaExtrato)
        // console.log('Historico parceiro e estab   '+ ParceiroEmpresaExtrato)

        res.send({msg:'GET com sucesso', ParceiroEmpresaExtrato:ParceiroEmpresaExtrato})
      } )
      .catch(error => console.error('Erro ao obter o extrato do parc empresa:', error));
})

app.get("/GETUsuarios", async (req, res) => {
    const response = await GETUsuarios(client)

    if (response?.isSucesso) {
        res.send({msg:'GET com sucesso', Sucesso: response.isSucesso, Usuarios:response.retornoUsuarios})
    } else {
        res.send({msg: "Erro ao recuperar usuários", Sucesso: false})
    }
})

app.put("/PUTUsuarioStatusRegistro", async (req, res) => {
    const { usuarioID } = req.body

    const resultado = await PUTUsuarioStatusRegistro(client, usuarioID)

    if (resultado?.isSucesso) {
        res.send({msg: "Usuário excluído com sucesso.", Sucesso: resultado.isSucesso})
    } else {
        res.send({msg: "Erro ao tentar excluir o usuário.", Sucesso: false})
    }
})

app.get("/GETListaParceirosTransacoes", async (req, res) => {
    try {
      const retornoParceirosTransacoes = await GETListaParceiroTransacoes(client);
  
      if (retornoParceirosTransacoes) {
        res.json({ ParceirosTransacoes: retornoParceirosTransacoes });
      } else {
        res.json({ ParceirosTransacoes: [] });
      }
    } catch (error) {
      console.error('Erro ao obter transações de parceiros:', error);
      res.status(500).json({ error: 'Erro ao obter transações de parceiros' });
    }
  });

  app.get("/GETListaEstabelecimentosTransacoes", async (req, res) => {
    try {
      const retornoEstabelecimentosTransacoes = await GETListaEstabelecimentosTransacoes(client);
      
      if (retornoEstabelecimentosTransacoes) {
        res.json({ EstabelecimentoTransacoes: retornoEstabelecimentosTransacoes });
      } else {
        res.json({ EstabelecimentoTransacoes: [] });
      }
    } catch (error) {
      console.error('Erro ao obter transações de estabe:', error);
      res.status(500).json({ error: 'Erro ao obter transações de estabe' });
    }
  });

app.get("/GETParceirosSistema", async (req, res) => {

    await GETParceirosSistema(client)
        .then(parceiroQuantidade => {
            // console.log('Historico parceiro e estab   '+ ParceiroEmpresaExtrato)

            res.send({ msg: 'GET com sucesso', parceiroQuantidade: parceiroQuantidade })
        })
        .catch(error => console.error('Erro ao obter o extrato do parc empresa:', error));
})


app.get("/GETEstabelecimentosSistema", async (req, res) => {

    await GETEstabelecimentosSistema(client)
        .then(estabelecimentoQuantidade => {
            // console.log('Historico parceiro e estab   '+ ParceiroEmpresaExtrato)

            res.send({ msg: 'GET com sucesso', estabelecimentoQuantidade: estabelecimentoQuantidade })
        })
        .catch(error => console.error('Erro ao obter o extrato do parc empresa:', error));
})

app.get("/GETTopParceiro", async (req, res) => {

    await GETTopParceiro(client)
        .then(topParceiros => {
            // console.log('Historico parceiro e estab   '+ ParceiroEmpresaExtrato)

            res.send({ msg: 'GET com sucesso', topParceiros: JSON.stringify(topParceiros) })
        })
        .catch(error => console.error('Erro ao obter o extrato do parc empresa:', error));
})

app.get("/GETParceiroPorEstado", async (req, res) => {

    await GETParceiroPorEstado(client)
        .then(parceiros => {
            // console.log('Historico parceiro e estab   '+ ParceiroEmpresaExtrato)

            res.send({ msg: 'GET com sucesso', parceiros: JSON.stringify(parceiros) })
        })
        .catch(error => console.error('Erro ao obter o extrato do parc empresa:', error));
})

app.get("/GETEstabelecimentoPorEstado", async (req, res) => {

    await GETEstabelecimentoPorEstado(client)
        .then(estabelecimentos => {
            // console.log('Historico parceiro e estab   '+ ParceiroEmpresaExtrato)

            res.send({ msg: 'GET com sucesso', estabelecimentos: JSON.stringify(estabelecimentos) })
        })
        .catch(error => console.error('Erro ao obter o extrato do parc empresa:', error));
})

app.post("/POSTParametro", async (req, res) => {
    const { parametro } = req.body
    const { data } = req.body

    const resultado = await POSTParametro(client, parametro, data)

    if (resultado?.isSucesso) {
        res.send({msg: "Valor do óleo cadastrado com sucesso.", Sucesso: resultado.isSucesso})
    } else {
        res.send({msg: "Erro ao cadastrar valor do óleo.", Sucesso: false})
    }
})

app.get("/GETParametroPorNome/:parametroNome", async (req, res) => {
    const { parametroNome } = req.params

    const retorno = await GETParametroPorNome(client, parametroNome)

    if (retorno !== undefined) {
        res.send({msg: "GET com sucesso", Sucesso: true, Parametro: retorno.retornoParametro})
    } else {
        res.send({msg: "Falha no GET", Sucesso: false })
    }
})

app.get("/GETHistoricoParametro", async (req, res) => {

    const retorno = await GETHistoricoParametro(client)

    if (retorno !== undefined) {
        res.send({msg: "GET com sucesso.", Sucesso: true, HistoricoParametroObj: retorno.retornoHistoricoParametro})
    } else {
        res.send({msg: "Falha no GET", Sucesso: false })
    }
})

app.listen(3001, () => {
    console.log("Servidor rodando!")
})

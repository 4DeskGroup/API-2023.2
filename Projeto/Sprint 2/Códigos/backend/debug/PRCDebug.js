import fs from "fs"

export default function prcDebug(msg, conteudo){
    const diretorio = "C:/TEMP/"

    const verificaDiretorio = () => {
        if (!fs.existsSync(diretorio)){
            fs.mkdir(diretorio, (err) => {
                if (err){
                    console.log("Deu ruim pra criar a pasta.")
                    return
                }
                
                console.log("Pasta criada com sucesso.")
                return diretorio
            })
        }
    }

    const data = new Date()
    const dia = data.getDate().toString().padStart(2,'0')
    const mes = String(data.getMonth() + 1).padStart(2,'0')
    const ano = data.getFullYear()
    const dataAtual = `${dia}.${mes}.${ano}`

    verificaDiretorio()

    fs.writeFile(`${diretorio}debug-${dataAtual}.txt`, msg + " - " + conteudo, 
    function (erro){
        if (erro){
            console.log("Erro ao criar arquivo.")
        }

        console.log("Arquivo criado com sucesso.")
    })
    
}
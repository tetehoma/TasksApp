const {select, input, checkbox} = require ('@inquirer/prompts')

//select - mostra uma lista de seleção
//input - permite que o usuário entre com algum dado
//checkbox - permite a modificação do estado de seleção

let meta = {
    value: "Tomar agua todos os dias",
    checked: false,
}
let metas = [ meta ]

//função que realiza o cadastro da meta

const cadastrarMeta = async () => {
    const meta = await input ({message: "Digite a meta:"})
 //operadores de comparação
    if(meta.length == 0){
        console.log("A meta não pode ser vazia!")
        return //interrompe a função
    }
    metas.push({
        value: meta,
        checked: false,
    })

}

const listarMetas = async () => { 
    const respostas = await checkbox({
        message: "Use as setas para mudar de metas, o espaço para marcar ou desmarcar e o enter para finalizar esta etapa.",
        choices: [...metas]
    })
    // esse if verifica se o usuario escreveu alguma meta
    if (respostas.length == 0){
        console.log("Nenhuma meta selecionada")
        return
    }
    //desmarca todas as metas
    metas.forEach((m) =>{
        m.checked = false
    })
    //
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })
    console.log("Metas marcadas como concluidas")
  }

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if (realizadas.length == 0){
        console.log("Nenhuma meta realizada")
        return  //interrompe a função
    }

    await select({
        message: "Meta realizadas",
        choices: [...realizadas]
    })
}
//const start é a função principal que chama o menu
const start = async () => {
    
    while (true) {

        const option = await select({
            message : "Menu >",
            choices : [
                {
                    value: "cadastrar",
                    name: "Cadastrar meta"
                },
                {
                    value: "listar",
                    name: "Listar metas"
                },
                {
                    value: "realizadas",
                    name: "metas realizadas"
                },
                {
                    value: "sair",
                    name: "Sair"
                }
            ]
        })

        switch (option) {
            case "cadastrar":
               await cadastrarMeta()
               console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "sair":
                console.log("Até a próxima")
                return //interrompe a função
            }
        //o return irá interromper a função inteira 
    }
}

start()
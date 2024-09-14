const {select, input, checkbox} = require ('@inquirer/prompts')

//select - mostra uma lista de seleção
//input - permite que o usuário entre com algum dado
//checkbox - permite a modificação do estado de seleção
let mensagem = "Bem vindo ao app de metas";
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
        mensagem = "A meta não pode ser vazia!"
        return //interrompe a função
    }
    //pega o valor digitado pelo input e coloca na lista de metas como falso
    metas.push(
        { value: meta, checked: false}
    )
    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => { 
    const respostas = await checkbox({
        message: "Use as setas para mudar de metas, o espaço para marcar ou desmarcar e o enter para finalizar esta etapa.",
        choices: [...metas]
    })
    metas.forEach((m) =>{
        m.checked = false
    })
    // esse if verifica se o usuario escreveu alguma meta
    if (respostas.length == 0){
        mensagem ="Nenhuma meta selecionada"
        return
    }
    //desmarca todas as metas
    //
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })
    mensagem = "Metas marcadas como concluidas"
  }

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if (realizadas.length == 0){
        mensagem = "Nenhuma meta realizada"
        return  //interrompe a função
    }

    await select({
        message: "Meta realizadas" + realizadas.length,
        choices: [...realizadas]
    })
}
const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return!meta.checked
    })
    if (abertas.length == 0){
      mensagem = "Nenhuma meta aberta"
        return  //interrompe a função
    }
    await select({
        message: "Meta abertas" + abertas.length,
        choices: [...abertas]
    })

}
const deletarMetas = async () => {

    //foi criada uma nova lista para metasDesmarcadas através do map, somente com as que estáo falsas
    const metasDesmarcadas = metas.map((meta) => {
        return {
            value: meta.value, checked: false}
    })
    //será colocado um checkbox com as metas Desmarcadas, igual ao usado no listar metas
    const itensADeletar = await checkbox({
        message: "Selecione o item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itensADeletar.length == 0) {
        mensagem = "Nenhuma item para deletar"
        return
    }
    //para cada meta encontrada será filtrada somente as que são diferentes do item
    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value!= item
        })
    })
    console.log("Metas deletadas com sucesso!")
}

const mostrarMensagem = () => {
    console.clear();
    if (mensagem!= ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}
//const start é a função principal que chama o menu
const start = async () => {
    
    while (true) {
        mostrarMensagem()

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
                    value: "abertas",
                    name: "metas abertas"
                },
                {
                    value: "deletar",
                    name: "deletar metas"
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
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break    
            case "sair":
                console.log("Até a próxima")
                return //interrompe a função
            }
        //o return irá interromper a função inteira 
    }
}

start()
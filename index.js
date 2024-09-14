//chama modulos do node
const {select, input, checkbox} = require ('@inquirer/prompts')
//chama um pacote do jason
const fs = require("fs").promises


//select - mostra uma lista de seleção
//input - permite que o usuário entre com algum dado
//checkbox - permite a modificação do estado de seleção
let mensagem = "Bem vindo ao app de metas";
let metas

//função que realiza o cadastro da meta
const carregarMetas = async() => {
    try {
        const data = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(data)
    } catch (error) {
        console.error("Não foi possível carregar as metas", error)
    }
}

const salvarMetas = async () => {
    try {
        await fs.writeFile("metas.json", JSON.stringify(metas, null, 2));
    } catch (error) {
        console.error("Não foi possível salvar as metas", error)
    }
}

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
    //insere nessa lista respostas um checkbox que tem como opções a cópia da lista metas
    const respostas = await checkbox({
        message: "Use as setas para mudar de metas, o espaço para marcar ou desmarcar e o enter para finalizar esta etapa.",
        choices: [...metas]
    })
    //para cada meta da lista de metas copiada será colocado nessa lista "m" e marcado como false, desmarcando-as
    metas.forEach((m) => {
        m.checked = false
    })
    // esse if verifica se o usuario escreveu alguma meta
    if (respostas.length == 0){
        mensagem ="Nenhuma meta selecionada"
        return
    }
    //para cada resposta do usuário, será verificada a primeira(resposta)
    //dentro de metas será procurada meta por meta (a cada "m"), será retornado verdadeiro se o valor de "m" for igual ao valor de resposta
    //então a const meta for verdadeiro, então a meta é marcada como verdadeira de realizada.
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })
    mensagem = "Metas marcadas como concluidas"
  }

const metasRealizadas = async () => {
    //filtra as metas que estão marcadas como checked (realizadas) e coloca nessa nova lista
    //o filtro verifica dentro de metas, de meta em meta, quais estão com valor checked(marcada)
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0){
        mensagem = "Nenhuma meta realizada"
        return  //interrompe a função
    }
    //esse await aguarda que o usuario verifique quais são suas metas realizadas atraves do select
    await select({
        message: "Meta realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}
const metasAbertas = async () => {
    //filtra as metas que não estão marcadas como checked (abertas) e coloca nessa nova lista
    const abertas = metas.filter((meta) => {
        return!meta.checked
    })
    if (abertas.length == 0){
      mensagem = "Nenhuma meta aberta"
        return  //interrompe a função
    }
    await select({
        message: "Meta abertas: " + abertas.length,
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
    //limpa o console depois verifica se a mensagem está vazia, se não, então exibe a mensagem que foi 
    //determinada pela função anterior
    console.clear();
    if (mensagem!= ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}
//const start é a função principal que chama o menu
const start = async () => {
    await carregarMetas()
    //menu da aplicação com while, enquanto estiver verdadeiro o menu aparece até que encontre um return
    while (true) {

        mostrarMensagem()
        await salvarMetas()
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
// esse switch utiliza as opções do menu para dar inicio as funções e determina caminhos através do break
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
                return //interrompe a função switch e encerra o programa
            }
        //o return irá interromper a função inteira 
    }
}
//esse start chama a função principal para que o programa comece a rodar
start()
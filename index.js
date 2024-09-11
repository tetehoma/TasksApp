const {select} = require ('@inquirer/prompts')

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
                    value: "sair",
                    name: "Sair"
                }
            ]
        })

        switch (option) {
            case "cadastrar":
                console.log("vamos cadastrar")
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                console.log("Até a próxima")
                return //interrompe a função
            }
        //o return irá interromper a função inteira 
    }
}

start()
const {select} = require ('@inquirer.prompts')

//const start é a função principal que chama o menu
const start = async () => {
    
    while (true) {

        const option = await select({
            message : "Menu >",
            choices : [
                {
                    value: "cadastrar meta",
                    name: "Cadastrar"
                },
                {
                    value: "listar",
                    name: "Listar"
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
                    return //interrompe a função
            }
        //o return irá interromper a função inteira 
    }
}

start()
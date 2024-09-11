

//const start é a função principal que chama o menu
const start = () => {
    
    while (true) {
        let option = "sair" 
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
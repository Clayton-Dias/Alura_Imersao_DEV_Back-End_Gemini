// Importa o módulo Express, o framework web Node.js para criar a aplicação.
import express from "express"; 

// Importa as rotas definidas no arquivo 'postsroutes.js' que contêm as definições das rotas da aplicação.
import routes from "./src/routes/postsroutes.js";

// Cria uma nova instância da aplicação Express.
const app = express();

// Configura o Express para servir arquivos estáticos da pasta "uploads" (útil para enviar imagens, documentos, etc.).
app.use(express.static("uploads"));

// Chama a função 'routes', passando o objeto 'app' como parâmetro para definir as rotas.
routes(app);

// A aplicação Express começa a escutar as requisições na porta 3000.
app.listen(3000, () => {
    // Exibe uma mensagem no console para indicar que o servidor está ativo e escutando.
    console.log("Servidor escutando...") 
});

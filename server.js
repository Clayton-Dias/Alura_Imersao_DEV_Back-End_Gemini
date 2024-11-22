// Importa o módulo 'express', que é um framework web do Node.js utilizado para criar e gerenciar a aplicação web.
import express from "express"; 

// Importa o arquivo 'postsroutes.js', que contém as definições das rotas para a aplicação.
// O arquivo de rotas define como a aplicação irá responder a diferentes URLs e tipos de requisições HTTP.
import routes from "./src/routes/postsroutes.js";

// Cria uma nova instância do aplicativo Express, que será usada para configurar e iniciar o servidor.
const app = express();

// Configura o Express para servir arquivos estáticos da pasta 'uploads'.
// Isso significa que qualquer arquivo (como imagens, documentos, etc.) colocado na pasta 'uploads' 
// pode ser acessado diretamente via URL pelo cliente (por exemplo, um navegador ou uma aplicação front-end).
app.use(express.static("uploads"));

// Chama a função 'routes', passando a instância da aplicação 'app' como parâmetro.
// A função 'routes' define as rotas da aplicação, associando as URLs a funções de controle que 
// irão tratar as requisições HTTP (GET, POST, etc.).
routes(app);

// Inicia o servidor Express para escutar as requisições na porta 3000.
// Quando o servidor começa a escutar, ele fica aguardando que os usuários enviem requisições 
// para o endereço localhost:3000 ou IP correspondente.
app.listen(3000, () => {
    // Exibe uma mensagem no console para confirmar que o servidor está ativo e aceitando requisições.
    console.log("Servidor escutando...") 
});


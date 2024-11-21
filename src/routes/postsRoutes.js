// Importa o módulo 'express', que é utilizado para criar o servidor e gerenciar rotas da aplicação.
import express from "express"; 

// Importa o 'multer', que é uma biblioteca para lidar com o upload de arquivos em requisições multipart/form-data.
import multer from "multer";

// Importa as funções de controle de posts, que lidam com a lógica de exibição, criação e upload de posts.
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

// Configura o armazenamento de arquivos com o multer, especificando o diretório e o nome do arquivo.
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos serão armazenados.
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // O caminho para salvar os arquivos é 'uploads/'.
    },
    // Define o nome do arquivo no servidor, que será o mesmo nome do arquivo original.
    filename: function (req, file, cb) {
        cb(null, file.originalname);  // Usa o nome original do arquivo enviado.
    }
});

// Cria um objeto 'upload' do multer com as configurações de destino e nome de arquivo.
const upload = multer({ dest: "./uploads", storage })

// Função que configura as rotas da aplicação. Ela recebe o 'app' como parâmetro (que é uma instância do Express).
const routes = (app) => {

    // Middleware que permite ao Express entender as requisições com corpo em formato JSON.
    app.use(express.json());

    // Define uma rota GET para o endpoint "/posts". Quando a URL "/posts" for acessada, a função 'listarPosts' será chamada.
    app.get("/posts", listarPosts);

    // Define uma rota POST para o endpoint "/posts". Quando um novo post for enviado para esse endpoint, a função 'postarNovoPost' será chamada.
    app.post("/posts", postarNovoPost);

    // Define uma rota POST para o endpoint "/upload". Quando um arquivo for enviado com a chave 'imagem' no formulário, o multer faz o upload e chama a função 'uploadImagem'.
    app.post("/upload", upload.single("imagem"), uploadImagem);
}

// Exporta a função 'routes' para que ela possa ser utilizada em outras partes da aplicação (geralmente no arquivo principal da aplicação, onde o servidor é iniciado).
export default routes;

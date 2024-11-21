// Importa o módulo 'express' para criar e gerenciar as rotas da aplicação.
import express from "express"; 

// Importa a função 'listarPosts' do controlador, que lida com a lógica de exibição dos posts.
import { listarPosts } from "../controllers/postsController.js";

// Função que configura as rotas da aplicação. A função recebe o 'app' como parâmetro.
const routes = (app) => {

    // Middleware que permite ao Express entender as requisições com corpo em formato JSON.
    app.use(express.json());

    // Define uma rota GET para o endpoint "/posts", que será gerenciada pela função 'listarPosts'.
    app.get("/posts", listarPosts);
}

// Exporta a função 'routes' para ser utilizada em outras partes da aplicação (como no arquivo principal da aplicação).
export default routes;

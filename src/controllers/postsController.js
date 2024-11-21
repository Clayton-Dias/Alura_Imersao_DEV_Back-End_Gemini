// Importa a função 'getTodosPosts' do modelo de posts para buscar os posts do banco de dados.
import { getTodosPosts } from "../models/postsModel.js";

// Função assíncrona 'listarPosts' para lidar com a requisição GET e listar os posts.
export async function listarPosts(req, res) {

    // Chama a função 'getTodosPosts' para obter todos os posts do banco de dados.
    const posts = await getTodosPosts();

    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON.
    res.status(200).json(posts); // Status 200 indica sucesso e os posts são retornados como um objeto JSON.
}



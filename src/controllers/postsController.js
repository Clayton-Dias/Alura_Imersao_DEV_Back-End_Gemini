// Importa a função 'getTodosPosts' e 'criarPost' do modelo de posts para interagir com o banco de dados.
import { getTodosPosts, criarPost} from "../models/postsModel.js";

// Importa o módulo 'fs' (File System) para manipulação de arquivos no sistema local.
import fs from "fs";

// Função assíncrona 'listarPosts' para lidar com a requisição GET e listar os posts.
export async function listarPosts(req, res) {
    // Chama a função 'getTodosPosts' para obter todos os posts do banco de dados.
    const posts = await getTodosPosts();

    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON.
    res.status(200).json(posts); // Status 200 indica sucesso e os posts são retornados como um objeto JSON.
}

// Função assíncrona 'postarNovoPost' para criar um novo post.
export async function postarNovoPost(req, res) {
    // Extrai o corpo da requisição (contendo os dados do novo post) da variável 'req.body'.
    const novoPost = req.body;

    try {
        // Chama a função 'criarPost' para inserir o novo post no banco de dados.
        const postCriado = await criarPost(novoPost);

        // Envia uma resposta HTTP com status 200 (OK) e o post recém-criado no formato JSON.
        res.status(200).json(postCriado);
    } catch(erro) {
        // Caso ocorra um erro, loga o erro no console e envia uma resposta de erro com status 500.
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

// Função assíncrona 'uploadImagem' para lidar com o upload de uma imagem associada a um post.
export async function uploadImagem(req, res) {
    // Cria um novo post com os dados da imagem. Aqui, 'req.file' contém informações do arquivo enviado.
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname, // Nome do arquivo de imagem.
        alt: "" // Texto alternativo da imagem, que no caso está vazio.
    };

    try {
        // Chama a função 'criarPost' para inserir o post no banco de dados com a URL da imagem.
        const postCriado = await criarPost(novoPost);

        // Define o caminho onde a imagem será armazenada localmente.
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

        // Move a imagem para o diretório 'uploads' e renomeia o arquivo usando o ID do post inserido.
        fs.renameSync(req.file.path, imagemAtualizada);

        // Envia uma resposta HTTP com status 200 (OK) e o post criado, que agora inclui a imagem.
        res.status(200).json(postCriado);  
    } catch(erro) {
        // Caso ocorra um erro, loga o erro no console e envia uma resposta de erro com status 500.
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

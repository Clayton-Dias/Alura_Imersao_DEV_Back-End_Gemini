// Importa a função 'getTodosPosts' e 'criarPost' do modelo de posts para interagir com o banco de dados.
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";

// Importa o módulo 'fs' (File System) para manipulação de arquivos no sistema local.
import fs from "fs";

// Importa a função para gerar uma descrição da imagem usando o serviço Gemini.
import gerarDescricaoComGemini from "../services/geminiService.js"

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
    } catch (erro) {
        // Caso ocorra um erro, loga o erro no console e envia uma resposta de erro com status 500.
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
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
    } catch (erro) {
        // Caso ocorra um erro, loga o erro no console e envia uma resposta de erro com status 500.
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Função assíncrona 'atualizarNovoPost' para atualizar um post existente.
export async function atualizarNovoPost(req, res) {
    // Obtém o ID do post a ser atualizado da URL da requisição (params).
    const id = req.params.id;
    // Define a URL da imagem do post.
    const urlImagem = `http://localhost:3000/${id}.png`

    // Cria um objeto com os dados para atualizar o post.
    const post = {
        imgUrl: urlImagem,
        descricao: req.body.descricao,  // Descrição do post recebida da requisição.
        alt: req.body.alt // Texto alternativo para a imagem, também recebido da requisição.
    }

    try {
        // Lê o arquivo de imagem usando o id para localizar a imagem no diretório 'uploads'.
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);

        // Chama o serviço 'gerarDescricaoComGemini' para gerar uma descrição a partir da imagem.
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        // Atualiza o objeto do post com a descrição gerada pela Gemini.
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        // Chama a função 'atualizarPost' para atualizar o post no banco de dados.
        const postCriado = await atualizarPost(id, post);

        // Envia uma resposta HTTP com status 200 (OK) e o post atualizado no formato JSON.
        res.status(200).json(postCriado);
    } catch (erro) {
        // Caso ocorra um erro, loga o erro no console e envia uma resposta de erro com status 500.
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

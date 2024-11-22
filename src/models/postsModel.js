// Importa o módulo 'dotenv/config' que carrega as variáveis de ambiente do arquivo .env para process.env.
import 'dotenv/config';

// Importa o 'ObjectId' do MongoDB, que é usado para criar e manipular IDs de documentos no banco de dados MongoDB.
import { ObjectId } from "mongodb";

// Importa a função 'conectarAoBanco' que é responsável por estabelecer a conexão com o banco de dados MongoDB.
import conectarAoBanco from "../config/dbconfig.js"; 

// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO.
// A variável de ambiente 'STRING_CONEXAO' deve conter a URL de conexão com o MongoDB (por exemplo, MongoDB Atlas).
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); 

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() { 
    // Obtém a referência ao banco de dados 'imersao-dev' da conexão MongoDB.
    // 'imersao-dev' é o nome do banco de dados dentro do MongoDB Atlas (ou outra instância MongoDB).
    const db = conexao.db("imersao-dev");

    // Obtém a coleção 'posts' do banco de dados 'imersao-dev'.
    // 'posts' é o nome da coleção que armazena os posts no banco de dados MongoDB.
    const colecao = db.collection("posts");

    // Retorna todos os documentos (posts) da coleção 'posts'.
    // A função 'find()' é usada para buscar todos os registros da coleção,
    // e 'toArray()' converte os resultados para um array.
    return colecao.find().toArray();
}


// Função assíncrona que cria um novo post no banco de dados.
export async function criarPost(novoPost) {
    // Conexão com o banco de dados "imersao-instabytes".
    const db = conexao.db("imersao-dev");

    // Acessa a coleção "posts" do banco de dados.
    const colecao = db.collection("posts");

    // Insere o novo post na coleção "posts" e retorna a resposta da operação de inserção.
    return colecao.insertOne(novoPost);
}

// Função assíncrona que atualiza um post existente no banco de dados com base no seu ID.
export async function atualizarPost(id, novoPost) {
    // Obtém a referência ao banco de dados 'imersao-dev' da conexão MongoDB.
    const db = conexao.db("imersao-dev");

    // Acessa a coleção 'posts' do banco de dados.
    const colecao = db.collection("posts");

    // Converte o ID do post para o tipo ObjectId do MongoDB, necessário para consultas no banco.
    const objID = ObjectId.createFromHexString(id);

    // Atualiza o post com o ID fornecido, aplicando as modificações definidas em 'novoPost'.
    // A operação de atualização é feita usando o operador $set, que altera os campos do post.
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}

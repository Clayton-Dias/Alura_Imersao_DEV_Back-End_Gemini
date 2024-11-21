// Importa a função para conectar ao banco de dados, definida em dbconfig.js.
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

import express from "express"; // Importa o módulo 'express' para criação da aplicação web.

const posts = [ // Array que simula um banco de dados de posts, cada post contém um ID, descrição e URL de uma imagem.
    { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
    { id: 2, descricao: "Gato fazendo yoga", imagem: "https://placecats.com/millie/300/150" },
    { id: 3, descricao: "Gato fazendo panqueca", imagem: "https://placecats.com/millie/300/150"},
];

// Função auxiliar para buscar um post pelo ID, retorna o índice do post ou -1 se não encontrar.
function buscarPostPorID(id){
    return posts.findIndex((post)=> { // 'findIndex' retorna o índice do primeiro post que satisfaça a condição.
        return post.id === Number(id); // Compara o ID do post com o parâmetro fornecido (convertido para número).
    });
}

// Criação da aplicação Express
const app = express(); // Cria uma nova instância da aplicação Express.
app.use(express.json()); // Middleware para interpretar o corpo das requisições como JSON.


// Definindo a rota GET "/posts" para retornar todos os posts.
app.get("/posts", (req, res)=> {
    res.status(200).json(posts); // Retorna os posts no formato JSON com status 200 (OK).
});

// Definindo a rota GET "/posts/:id" para retornar um post específico por ID.
app.get("/posts/:id", (req, res)=> {
    const index = buscarPostPorID(req.params.id); // Chama a função de busca passando o ID como parâmetro.

    if (index !== -1) { // Se o post for encontrado (o índice não é -1)
        res.status(200).json(posts[index]); // Retorna o post com status 200.
    } else { // Se o post não for encontrado (índice -1)
        res.status(404).json({ error: "Post não encontrado!" }); // Retorna status 404 (não encontrado) com uma mensagem de erro.
    }
});

// Iniciando o servidor na porta 3000.
app.listen(3000, () => {
    console.log("Servidor escutando..."); // Exibe no console que o servidor está rodando.
});


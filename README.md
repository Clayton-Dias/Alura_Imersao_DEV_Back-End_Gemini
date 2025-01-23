# Projeto de API com Express e MongoDB da Imersão DEV Back End da Alura com Gemini

Este projeto é uma API construída com o framework **Express** para o gerenciamento de posts, incluindo funcionalidades como a criação, listagem e upload de imagens associadas aos posts. A API se conecta ao banco de dados **MongoDB** para armazenar e recuperar os posts, e também utiliza o serviço **Google Gemini** para gerar descrições automáticas para imagens.

## Funcionalidades

- **Listar Posts**: Retorna todos os posts armazenados no banco de dados.
- **Criar Novo Post**: Permite criar um novo post no banco de dados.
- **Upload de Imagem**: Permite fazer o upload de uma imagem associada a um post.
- **Atualizar Post**: Atualiza um post existente com novos dados, incluindo uma descrição gerada automaticamente para a imagem.

## Pré-requisitos

Antes de rodar o projeto, você precisa ter o seguinte instalado em sua máquina:

- **Node.js**: [Instalar Node.js](https://nodejs.org/)
- **MongoDB**: [Instalar MongoDB](https://www.mongodb.com/try/download/community)
- **Google Gemini API Key**: Você precisará de uma chave de API do Google Gemini para gerar descrições de imagens. Crie sua chave no [Google Cloud Console](https://console.cloud.google.com/).

## Como Rodar o Projeto

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
STRING_CONEXAO=mongodb://localhost:27017/imersao-dev
GEMINI_API_KEY=sua_chave_de_api_do_gemini
```

4. **Execute o servidor**

```bash
npm start
```

O servidor será iniciado na porta `3000`. Você pode acessar a API em `http://localhost:3000`.

## Endpoints

A API disponibiliza os seguintes endpoints:

- **GET** `/posts` - Retorna todos os posts.
- **POST** `/posts` - Cria um novo post.
- **POST** `/upload` - Faz o upload de uma imagem associada a um post. 
  - Enviar um arquivo com a chave `imagem`.
- **PUT** `/upload/:id` - Atualiza o post com o ID fornecido, incluindo a geração de uma descrição para a imagem.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

```
/nome-do-repositorio
├── /src
│   ├── /controllers          # Funções que controlam as rotas e interações com o banco de dados
│   ├── /models               # Modelos de dados (interações com o banco)
│   ├── /routes               # Definição das rotas da API
│   └── /services             # Lógica para serviços externos (Google Gemini API)
├── /uploads                  # Diretório onde as imagens serão armazenadas
├── .env                      # Arquivo com variáveis de ambiente
├── app.js                    # Arquivo principal que inicializa a aplicação
└── package.json              # Dependências e scripts do projeto
```

## Dependências

- `express`: Framework web para Node.js.
- `mongodb`: Biblioteca para interagir com o MongoDB.
- `multer`: Middleware para upload de arquivos.
- `cors`: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- `@google/generative-ai`: Biblioteca para interagir com o Google Gemini API.
- `dotenv`: Carrega variáveis de ambiente de um arquivo `.env`.

## Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`).
3. Faça suas alterações e commit (`git commit -am 'Adiciona nova funcionalidade'`).
4. Push para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
```

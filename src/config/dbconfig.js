import { MongoClient } from 'mongodb';

// Função assíncrona para conectar ao banco de dados MongoDB Atlas
export default async function conectarAoBanco(stringConexao) {
  let mongoClient;

  try {
      // Cria uma instância do cliente MongoDB, passando a string de conexão
      mongoClient = new MongoClient(stringConexao);
      
      // Exibe no console que está tentando se conectar ao banco de dados
      console.log('Conectando ao cluster do banco de dados...');
      
      // Tenta estabelecer a conexão com o banco de dados
      await mongoClient.connect();
      
      // Se a conexão for bem-sucedida, exibe uma mensagem de sucesso
      console.log('Conectado ao MongoDB Atlas com sucesso!');

      // Retorna o cliente conectado, para que ele possa ser usado em outras partes do código
      return mongoClient;
  } catch (erro) {
      // Se ocorrer algum erro durante a conexão, exibe o erro no console
      console.error('Falha na conexão com o banco!', erro);
      
      // Finaliza o processo com erro
      process.exit();
  }
}

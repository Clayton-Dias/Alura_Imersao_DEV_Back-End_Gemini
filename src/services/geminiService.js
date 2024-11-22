// Importa a classe 'GoogleGenerativeAI' do pacote '@google/generative-ai', 
// que fornece acesso à API de IA generativa do Google, permitindo gerar texto com base em imagens.
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa o cliente da API do Google Gemini utilizando a chave de API armazenada 
// na variável de ambiente 'GEMINI_API_KEY'. Isso cria uma instância para interagir com a IA.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo de IA específico do Google Gemini para geração de conteúdo,
// neste caso, o modelo 'gemini-1.5-flash', uma versão otimizada para geração de texto.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função assíncrona para gerar uma descrição (alt-text) de uma imagem fornecida em formato de buffer.
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Definindo o prompt que será enviado ao modelo de IA para gerar uma descrição para a imagem.
  // A descrição solicitada é em português do Brasil.
  const prompt =
    "Gere uma descrição em português do Brasil para a seguinte imagem";

  try {
    // Prepara a imagem para envio à API Gemini. A imagem é convertida para uma string em base64,
    // que é um formato adequado para enviar dados binários (como imagens) como texto.
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"), // Converte a imagem de buffer para base64.
        mimeType: "image/png", // Especifica o tipo MIME da imagem (no caso, PNG).
      },
    };

    // Chama o método 'generateContent' do modelo, passando o prompt e a imagem.
    // Esse método envia a requisição para a API e aguarda a resposta, que contém a descrição gerada.
    const res = await model.generateContent([prompt, image]);

    // Retorna a descrição gerada pela IA. Se não houver texto gerado, retorna uma mensagem padrão.
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // Em caso de erro, registra a mensagem do erro no console e lança um novo erro com uma mensagem mais genérica.
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}

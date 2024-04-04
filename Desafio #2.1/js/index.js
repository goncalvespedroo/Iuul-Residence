const Ajv = require('../models/model');
const fs = require('fs');

const caminhoArquivo = './dados.json';

function lerArquivoJSON(caminhoArquivo) {
  try {
    // Verifica se o arquivo existe
    if (!fs.existsSync(caminhoArquivo)) {
      throw new Error('O arquivo não existe.');
    }

    const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf8');

    // Verifica se o arquivo está vazio
    if (!conteudoArquivo.trim()) {
      throw new Error('O arquivo está vazio.');
    }

    const dados = JSON.parse(conteudoArquivo);

    // Adicione aqui a validação dos campos obrigatórios usando Ajv, se necessário

    return dados;
  } catch (erro) {
    console.error('Erro ao ler o arquivo:', erro.message);
    return null;
  }
}

const dados = lerArquivoJSON(caminhoArquivo);

if (dados) {
  console.log('Conteúdo do arquivo JSON:', dados);
} else {
  console.log('Falha ao ler o arquivo JSON.');
}

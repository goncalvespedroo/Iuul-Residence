const validarDados = require('../models/model');

const fs = require('fs');

const caminhoArquivo = './dados.json';

function lerArquivoJSON(caminhoArquivo) {
  try {
    const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf8');
    
    const dados = JSON.parse(conteudoArquivo);

    return dados;
  } catch (erro) {
    console.error('Erro ao ler o arquivo:', erro);
    return null;
  }
}

const dadosJSON = lerArquivoJSON(caminhoArquivo);

validarDados(dadosJSON);

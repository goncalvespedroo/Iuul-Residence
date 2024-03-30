const validarDados = require('../models/model');

module.exports = function saida(validarDados) {
    if (validarDados(dadosJSON)) {
        console.log('Dados válidos.');
    } else {
        console.log('Dados inválidos.');
    }
}
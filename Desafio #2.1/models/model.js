module.exports = function validarDados(dadosJSON) {
    const regrasValidacao = {
        nome: { tipo: 'string', mensagem: 'Nome inválido ou ausente.' },
        cpf: { tipo: 'number', mensagem: 'CPF inválido ou ausente.' },
        dt_nascimento: { tipo: 'string', mensagem: 'Data de nascimento inválida ou ausente.' },
        renda_mensal: { tipo: 'string', mensagem: 'Renda mensal inválida ou ausente.' },
        estado_civil: { tipo: 'string', mensagem: 'Estado civil inválido ou ausente.' }
    };

    for (let campo in regrasValidacao) {
        if (!dadosJSON.hasOwnProperty(campo)) {
            console.log(regrasValidacao[campo].mensagem);
            return false;
        }

        if (typeof dadosJSON[campo] !== regrasValidacao[campo].tipo) {
            console.log(regrasValidacao[campo].mensagem);
            return false;
        }
    }

    return true;
}

function validarRendaMensal(dados) {
    if (!dados.hasOwnProperty('renda_mensal')) {
        console.log('Dado inexistente.');
        return false;
    }

    if (typeof dados.renda_mensal !== 'string') {
        console.log('Dado inválido.');
        return false;
    }

    return true;
}

function validarEstadoCivil(dados) {
    if (!dados.hasOwnProperty('estado_civil')) {
        console.log('Dado inexistente.');
        return false;
    }

    if (typeof dados.estado_civil !== 'string') {
        console.log('Dado inválido.');
        return false;
    }

    return true;
}

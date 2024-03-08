// Função para validar se o nome possui pelo menos 5 caracteres
function validarNome(nome) {
    return nome.length >= 5;
}

// Função para validar o CPF
function validarCPF(cpf) {
    // Verifica se o CPF possui exatamente 11 dígitos numéricos
    return /^\d{11}$/.test(cpf);
}

// Função para validar a data de nascimento
function validarDataNascimento(dataNascimento) {
    // Verifica se a data possui o formato DD/MM/AAAA
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dataNascimento)) {
        return false;
    }

    // Verifica se a data é válida
    const partesData = dataNascimento.split("/");
    const dia = parseInt(partesData[0]);
    const mes = parseInt(partesData[1]) - 1; // Os meses em JavaScript são base 0 (janeiro = 0)
    const ano = parseInt(partesData[2]);
    const data = new Date(ano, mes, dia);
    const dataAtual = new Date();
    const idade = dataAtual.getFullYear() - data.getFullYear();

    // Verifica se o cliente tem pelo menos 18 anos
    return idade >= 18;
}

// Função para validar a renda mensal
function validarRenda(renda) {
    // Verifica se a renda possui o formato correto (número com duas casas decimais e vírgula decimal)
    return /^\d+(,\d{2})?$/.test(renda);
}

// Função para validar o estado civil
function validarEstadoCivil(estadoCivil) {
    // Verifica se o estado civil é válido (C, S, V ou D, maiúsculo ou minúsculo)
    return ['C', 'S', 'V', 'D'].includes(estadoCivil.toUpperCase());
}

// Função para validar o número de dependentes
function validarDependentes(dependentes) {
    // Verifica se o número de dependentes está entre 0 e 10
    return dependentes >= 0 && dependentes <= 10;
}

// Função para formatar o CPF com máscara
function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para formatar a renda com duas casas decimais e vírgula decimal
function formatarRenda(renda) {
    return parseFloat(renda.replace(",", ".")).toFixed(2);
}

// Função para formatar a data com máscara
function formatarData(data) {
    const partesData = data.split("/");
    return `${partesData[0]}/${partesData[1]}/${partesData[2]}`;
}

// Função para solicitar os dados do cliente via console
function solicitarDadosCliente() {
    let nome, cpf, dataNascimento, renda, estadoCivil, dependentes;

    // Solicita o nome e valida
    do {
        nome = prompt("Digite o nome (pelo menos 5 caracteres):");
    } while (!validarNome(nome));

    // Solicita o CPF e valida
    do {
        cpf = prompt("Digite o CPF (11 dígitos):");
    } while (!validarCPF(cpf));

    // Solicita a data de nascimento e valida
    do {
        dataNascimento = prompt("Digite a data de nascimento (DD/MM/AAAA):");
    } while (!validarDataNascimento(dataNascimento));

    // Solicita a renda mensal e valida
    do {
        renda = prompt("Digite a renda mensal (com duas casas decimais e vírgula decimal):");
    } while (!validarRenda(renda));

    // Solicita o estado civil e valida
    do {
        estadoCivil = prompt("Digite o estado civil (C, S, V ou D):");
    } while (!validarEstadoCivil(estadoCivil));

    // Solicita o número de dependentes e valida
    do {
        dependentes = parseInt(prompt("Digite o número de dependentes (entre 0 e 10):"));
    } while (!validarDependentes(dependentes));

    // Retorna os dados do cliente formatados
    return {
        nome: nome,
        cpf: formatarCPF(cpf),
        dataNascimento: formatarData(dataNascimento),
        renda: formatarRenda(renda),
        estadoCivil: estadoCivil.toUpperCase(),
        dependentes: dependentes
    };
}

// Solicita os dados do cliente e exibe na tela
const dadosCliente = solicitarDadosCliente();
console.log("Dados do Cliente:");
console.log("Nome:", dadosCliente.nome);
console.log("CPF:", dadosCliente.cpf);
console.log("Data de Nascimento:", dadosCliente.dataNascimento);
console.log("Renda Mensal:", dadosCliente.renda);
console.log("Estado Civil:", dadosCliente.estadoCivil);
console.log("Número de Dependentes:", dadosCliente.dependentes);

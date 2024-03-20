const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lista_de_agendamento = [];

let lista_de_usuarios = [
  {
    cpf: '08317030164',
    nome: 'Joao',
    dataNascimento: '11/11/11',
    agendamentos: [] // Array vazio para armazenar os agendamentos
  },
  {
    cpf: '17158608700',
    nome: 'Amanda',
    dataNascimento: '11/11/11',
    agendamentos: []
  },
  {
    cpf: '10522076424',
    nome: 'Matheus',
    dataNascimento: '11/11/11',
    agendamentos: []
  },
];

function exibirListaDeUsuarios(lista) {
  console.log("------------------------------------------------------------");
  console.log("CPF            Nome                             Dt.Nasc.   Idade");
  console.log("------------------------------------------------------------");

  lista.forEach(usuario => {
    let idade = calcularIdade(usuario.dataNascimento);
    console.log(`${usuario.cpf} ${padronizarNome(usuario.nome)} ${usuario.dataNascimento} ${idade}`);
  });

  console.log("------------------------------------------------------------");
}

function exibirListaDeUsuariosAgendados(lista) {
  console.log("------------------------------------------------------------");
  console.log("Data            H.Ini   H.Fim   Nome                         Data");
  console.log("------------------------------------------------------------");

  lista.forEach(consulta => {
    let idade = calcularIdade(consulta.data);
    console.log(`${consulta.data} ${consulta.horaInicial}-${consulta.horaFinal} ${padronizarNome(consulta.paciente)}`);
  });

  console.log("------------------------------------------------------------");
}

function listarAgendamentosAPartirDeData(data) {
  console.log(`Agendamentos a partir de ${data}:`);
  console.log("------------------------------------------------------------");
  console.log("Data            H.Ini   H.Fim   Nome                         Data");
  console.log("------------------------------------------------------------");

  lista_de_agendamento.forEach(consulta => {
    if (new Date(consulta.data) >= data) {
      let idade = calcularIdade(consulta.data);
      console.log(`${consulta.data} ${consulta.horaInicial}-${consulta.horaFinal} ${padronizarNome(consulta.paciente)}`);
    }
  });

  console.log("------------------------------------------------------------");
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;

  // Verifica o primeiro dígito verificador
  if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
    return false;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;

  // Verifica o segundo dígito verificador
  if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
    return false;
  }

  // CPF válido
  return true;
}


function calcularIdade(dataNascimento) {
  let partesData = dataNascimento.split("/");
  let anoNascimento = parseInt(partesData[2]);
  let anoAtual = new Date().getFullYear();
  return anoAtual - anoNascimento;
}

function padronizarNome(nome) {
  return nome.padEnd(33, ' ');
}

function agendarConsulta() {
  // Obtendo a data atual
  let dataAtual = new Date();

  rl.question('CPF do paciente: ', (cpf) => {
    let paciente = lista_de_usuarios.find(usuario => usuario.cpf === cpf);
    if (!paciente) {
      console.log('Paciente não encontrado na lista.');
      exibirMenuPrincipal();
      return;
    }

    rl.question('Data da consulta (DD/MM/AAAA): ', (dataConsulta) => {
      // Convertendo a data da consulta para o formato de data
      let partesDataConsulta = dataConsulta.split('/');
      let dataConsultaFormatada = new Date(partesDataConsulta[2], partesDataConsulta[1] - 1, partesDataConsulta[0]);

      // Comparando a data da consulta com a data atual
      if (dataConsultaFormatada <= dataAtual) {
        console.log('Data da consulta inválida. Deve ser maior que a data atual.');
        exibirMenuPrincipal();
        return;
      }

      rl.question('Hora inicial (HH:MM): ', (horaInicial) => {
        rl.question('Hora final (HH:MM): ', (horaFinal) => {
          // Validar os horários e outros detalhes da consulta
          // Se tudo estiver válido, agendar a consulta e adicionar aos agendamentos

          let consulta = {
            paciente: paciente.nome,
            cpf: paciente.cpf,
            data: dataConsulta,
            horaInicial: horaInicial,
            horaFinal: horaFinal
          };

          paciente.agendamentos.push({
            data: dataConsulta,
            horaInicial: horaInicial,
            horaFinal: horaFinal
          }); // Adiciona o agendamento ao usuário

          lista_de_agendamento.push(consulta);

          console.log('Consulta agendada com sucesso.');
          exibirMenuPrincipal();
        });
      });
    });
  });
}

function listarAgenda() {
  exibirListaDeUsuariosAgendados(lista_de_agendamento);
  exibirMenuPrincipal();

}

// erros :

function cancelarAgendamento() {
  rl.question('Digite o CPF do paciente que deseja excluir o agendamento: ', (cpf) => {
    const index = lista_de_agendamento.findIndex(usuario => usuario.cpf === cpf);
    if (index !== -1) {
      lista_de_agendamento.splice(index, 1);
      console.log(`Agendamento do paciente com CPF ${cpf} excluído com sucesso.`);
    } else {
      console.log(`Agendamento do paciente com CPF ${cpf} não encontrado na lista.`);
    }
    exibirMenuPrincipal();
  });
}

function excluirPaciente() {
  rl.question('Digite o CPF do paciente que deseja excluir: ', (cpf) => {
    const index = lista_de_usuarios.findIndex(usuario => usuario.cpf === cpf);
    if (index !== -1) {
      lista_de_usuarios.splice(index, 1);
      console.log(`Paciente com CPF ${cpf} excluído com sucesso.`);
    } else {
      console.log(`Paciente com CPF ${cpf} não encontrado na lista.`);
    }
    exibirMenuPrincipal();
  });
}


function cadastrarNovoPaciente() {
  let paciente = {}; // um objeto vazio

  rl.question("Digite o CPF: ", (cpf) => {
    paciente.cpf = cpf.replace(/\D/g, ''); // formatando as informações para padronizar
    if (!validarCPF(paciente.cpf)) {
      console.log('CPF inválido');
      exibirMenuPrincipal();
      return;
    }

    let cpfExistente = lista_de_usuarios.find(usuario => usuario.cpf === paciente.cpf);
    if (cpfExistente) {
      console.log('Paciente já cadastrado');
      exibirMenuPrincipal();
      return;
    }

    rl.question("Digite o nome: ", (nome) => {
      if (nome.length < 5) {
        console.log('Nome inválido. Deve conter pelo menos 5 caracteres.');
        cadastrarNovoPaciente(); // Solicita novamente o nome
        return;
      }

      paciente.nome = nome;

      rl.question("Digite a data de nascimento (DD/MM/AAAA): ", (dataNascimento) => {
        paciente.dataNascimento = dataNascimento;

        let partesData = dataNascimento.split("/");
        let anoNascimento = partesData[2];
        let idade = 2024 - anoNascimento;

        if (idade < 13) {
          console.log('Paciente é muito jovem para ser cadastrado.');
          rl.close();
          return;
        }

        lista_de_usuarios.push(paciente); // Adicionando o paciente à lista
        console.log('Paciente cadastrado com sucesso:', paciente);
        console.log('Idade do paciente:', idade);
        exibirMenuPrincipal();
      });
    });
  });
}

function listarPacientesPorCpf() {
  lista_de_usuarios.sort((a, b) => {
    return a.cpf.localeCompare(b.cpf);
  });
  console.log(lista_de_usuarios);
  exibirMenuPrincipal();

}

function listarPacientesPorNome() {
  lista_de_usuarios.sort((a, b) => {
    return a.nome.localeCompare(b.nome);
  });
  console.log(lista_de_usuarios);
  exibirMenuPrincipal();

}

function menuPacientes() {
  console.log("Menu do Cadastro de Pacientes");
  console.log("1 - Cadastrar novo Paciente");
  console.log("2 - Excluir Paciente");
  console.log("3 - Listar pacientes (ordenado por CPF)");
  console.log("4 - Listar pacientes (ordenado por nome)");
  console.log("5 - Voltar p/ menu principal");




  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case '1': cadastrarNovoPaciente();
        break;
      case '2': excluirPaciente();
        break;
      case '3': listarPacientesPorCpf();
        break;
      case '4': listarPacientesPorNome();
        break;
      case '5': exibirMenuPrincipal();
        break;
      default: console.log('Opção não encontrada');
    }
  });
}

function menuAgenda() {
  console.log("Agenda");
  console.log("1 - Agendar consulta");
  console.log("2 - Cancelar agendamento");
  console.log("3 - Listar agenda");
  console.log("4 - Listar agendamentos a partir de uma data específica");
  console.log("5 - Voltar p/ menu principal");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case '1': agendarConsulta();
        break;
      case '2': cancelarAgendamento();
        break;
      case '3': listarAgenda();
        break;
      case '4':
        rl.question("Digite a data a partir da qual deseja visualizar os agendamentos (DD/MM/AAAA): ", (dataInput) => {
          let [dia, mes, ano] = dataInput.split('/');
          let data = new Date(ano, mes - 1, dia);
          listarAgendamentosAPartirDeData(data);
          exibirMenuPrincipal();
        });
        break;
      case '5': exibirMenuPrincipal();
        break;
      default: console.log('Opção não encontrada');
    }
  });
}


function exibirMenuPrincipal() {
  console.log("Menu Principal");
  console.log("1 - Cadastro de pacientes");
  console.log("2 - Agenda");
  console.log("3 - Fim");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case '1': menuPacientes();
        break;
      case '2': menuAgenda();
        break;
      case '3':
        rl.close(); // Fechar o readline e encerrar o programa
        break;
      default: console.log('Opção não encontrada');
    }
  });
}

// Inicia o programa exibindo o menu principal
exibirMenuPrincipal();

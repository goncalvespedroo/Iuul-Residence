const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lista_de_usuarios = [
    { cpf: '08317030164', nome: 'Joao', dataNacimento: '11/11/11' },
    { cpf: '17158608700', nome: 'Amanda', dataNacimento: '11/11/11' },
    { cpf: '10522076424', nome: 'Matheus', dataNacimento: '11/11/11' },
];

 
function validandoCpf(cpfString){
  let validacao = false; 

  
  if (cpfString.length !== 14 && cpfString.length !== 11) {
    return validacao;
  }

  
  let soma = 0, rest = 0;

  
  if (cpfString === '00000000000') {
    return validacao;
  }

 
  for (let i = 1; i <= 9; ++i) {
    soma += (parseInt(cpfString.substring(i - 1, i)) * (11 - i));
  }

  
  rest = (soma * 10) % 11;

  if ((rest == 10) || (rest == 11)) {
    rest = 0;
  }

  if (rest != parseInt(cpfString.substring(9, 10))) {
    return validacao;
  }

  validacao = true;
  return validacao;
}



function agendarConsulta(){
    console.log('a');
}

function cancelarAgendamento(){
    console.log('a');
}

function listarAgenda(){
    console.log('a');
}

function cadastrarNovoPaciente() {
    let paciente = {}; // um objeto vazio
    
    rl.question("Ecreva o CPF: ", (cpf) => {
        paciente.cpf = cpf.replace(/\D/g, ''); // formatando as informações para padronizar
        if(!validateCpf(paciente.cpf)){
            console.log('CPF invalido')
            rl.close()
        }
        
        let cpfExistente = false;
        cpfExistente = lista_de_usuarios.find(usuario => usuario.cpf=== paciente.cpf);
        
        if(cpfExistente){
            console.log('Paciente já cadastrado');
            rl.close();
        }
        
        console.log(lista_de_usuarios);
        
        rl.question("Ecreva o nome: ", (nome) => {
            paciente.nome = nome;
            
            rl.question("Escreva a data de nascimento: ", (dataNascimento) => {
                paciente.dataNacimento = dataNascimento;
                
                    lista_de_usuarios.push(paciente); // Adicionando o paciente a lista
                    console.log(lista_de_usuarios);
                    rl.close();
            });
            
        });
        
    });

}

function excluirPaciente() {
    console.log('a');
}

function listarPacientesPorCpf() {
    console.log('a');
}

function listarPacientesPorNome() {
    console.log('a');
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
        case '5': console.log('sair');
        break;
        defoult: console.log ('Opção não encontrada')
    } 
  });
}

function menuAgenda() {
  console.log("Agenda");
  console.log("1 - Agendar consulta");
  console.log("2 - Cancelar agendamento");
  console.log("3 - Listar agenda");
  console.log("4 - Voltar p/ menu principal");
  
  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
        case '1': agendarConsulta(); 
        break;
        case '2': cancelarAgendamento();
        break;
        case '3': listarAgenda();
        break;
        case '4': console.log('sair');
        break;
        defoult: console.log ('Opção não encontrada')
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
        defoult: console.log ('Opção não encontrada')
    } 
  });
}
// Inicia o programa exibindo o menu principal
exibirMenuPrincipal();

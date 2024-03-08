class Aluno {
    constructor(matricula, nome) {
        this.matricula = matricula;
        this.nome = nome;
        this.P1 = null;
        this.P2 = null;
    }

    // Método para calcular a nota final do aluno
    calcularNotaFinal() {
        // Se o aluno faltou a ambas provas
        if (this.P1 === null && this.P2 === null) {
            return 0;
        }
        // Se o aluno faltou a uma das provas
        else if (this.P1 === null || this.P2 === null) {
            return (this.P1 !== null ? this.P1 : this.P2) / 2;
        }
        // Se o aluno realizou ambas as provas
        else {
            return ((this.P1 + this.P2) / 2).toFixed(1);
        }
    }
}

class Turma {
    constructor() {
        this.alunos = [];
    }

    // Método para inserir um aluno na turma
    inserirAluno(aluno) {
        // Verifica se já existe um aluno com a mesma matrícula na turma
        const alunoExistente = this.alunos.find(a => a.matricula === aluno.matricula);
        if (alunoExistente) {
            console.log("Já existe um aluno com esta matrícula na turma.");
            return;
        }
        // Insere o aluno na turma
        this.alunos.push(aluno);
    }

    // Método para remover um aluno da turma a partir da matrícula
    removerAluno(matricula) {
        this.alunos = this.alunos.filter(aluno => aluno.matricula !== matricula);
    }

    // Método para lançar a nota (P1 ou P2) de um aluno
    lancarNota(matricula, prova, nota) {
        const aluno = this.alunos.find(a => a.matricula === matricula);
        if (!aluno) {
            console.log("Aluno não encontrado na turma.");
            return;
        }
        if (prova === "P1") {
            aluno.P1 = nota;
        } else if (prova === "P2") {
            aluno.P2 = nota;
        } else {
            console.log("Prova inválida. Use 'P1' ou 'P2'.");
        }
    }

    // Método para imprimir os alunos da turma em ordem alfabética com suas notas
    imprimirAlunos() {
        console.log("---------------------------------------");
        console.log("Matricula Nome P1 P2 NF");
        console.log("---------------------------------------");

        this.alunos.sort((a, b) => a.nome.localeCompare(b.nome));

        for (const aluno of this.alunos) {
            const notaFinal = aluno.calcularNotaFinal();
            console.log(`${aluno.matricula} ${aluno.nome} ${aluno.P1 || "-"} ${aluno.P2 || "-"} ${notaFinal}`);
        }

        console.log("---------------------------------------");
    }
}

// Criando uma instância da turma
const turma = new Turma();

// Leitura dos dados dos alunos e suas notas
const quantidadeAlunos = parseInt(prompt("Digite a quantidade de alunos na turma:"));

for (let i = 0; i < quantidadeAlunos; i++) {
    const matricula = parseInt(prompt(`Digite a matrícula do aluno ${i + 1}:`));
    const nome = prompt(`Digite o nome do aluno ${i + 1}:`);

    const aluno = new Aluno(matricula, nome);
    turma.inserirAluno(aluno);

    const notaP1 = prompt(`Digite a nota da P1 do aluno ${i + 1} (ou '-' se faltou):`);
    if (notaP1 !== "-") {
        aluno.P1 = parseFloat(notaP1);
    }

    const notaP2 = prompt(`Digite a nota da P2 do aluno ${i + 1} (ou '-' se faltou):`);
    if (notaP2 !== "-") {
        aluno.P2 = parseFloat(notaP2);
    }
}

// Impressão da lista de alunos
turma.imprimirAlunos();

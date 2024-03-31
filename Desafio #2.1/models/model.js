const Ajv = require("ajv");
const fs = require("fs");
const { DateTime } = require('luxon');

const schemajs = {

    "$id": "http://example.com/example.json",
    "type": "array",
    "default": [],
    "title": "Root Schema",
    "items": {
        "type": "object",
        "default": {},
        "title": "A Schema",
        "required": [
            "nome",
            "cpf",
            "dt_nascimento",
            "renda_mensal",
            "estado_civil"
        ],
        "properties": {
            "nome": {
                "type": "string",
                "default": "",
                "title": "The nome Schema",
                "examples": [
                    "Carlos Roberto"
                ]
            },
            "cpf": {
                "type": "number",
                "default": "",
                "title": "The cpf Schema",
                "examples": [
                    "18493838047"
                ]
            },
            "dt_nascimento": {
                "type": "number",
                "default": "",
                "title": "The dt_nascimento Schema",
                "examples": [
                    "14091966"
                ]
            },
            "renda_mensal": {
                "type": "number",
                "default": "",
                "title": "The renda_mensal Schema",
                "examples": [
                    "8387,92"
                ]
            },
            "estado_civil": {
                "type": "string",
                "default": "",
                "title": "The estado_civil Schema",
                "examples": [
                    "C"
                ]
            }
        },
        "examples": [{
            "nome": "Carlos Roberto",
            "cpf": 18493838047,
            "dt_nascimento": 14091966,
            "renda_mensal": 8387.92,
            "estado_civil": "C"
        }]
    },
    "examples": [
        [{
            "nome": "Carlos Roberto",
            "cpf": 18493838047,
            "dt_nascimento": 14091966,
            "renda_mensal": 8387.92,
            "estado_civil": "C"
        }]
    ]
}

const ajv = new Ajv();

// Compila o esquema
const validar = ajv.compile(schemajs);

// Carrega os dados JSON
const dados = JSON.parse(fs.readFileSync('./dados.json'));

// Valida os dados
const valid = validar(dados);

function validacao(verificador) {
    if (valid) {
        console.log('Os dados são válidos em relação ao esquema.');
        // Adicione aqui qualquer outra lógica que você queira executar quando os dados forem válidos
    } else {
        console.log('Os dados não são válidos em relação ao esquema.');
        
        // Obter data e hora atuais
        const agora = DateTime.now().toFormat('yyyyMMdd_HHmmss');
        
        // Criar nome do arquivo com a data e hora atuais
        const nomeArquivo = `dados_invalidos_${agora}.json`;

        // Escrever os dados inválidos em um novo arquivo JSON
        fs.writeFile(nomeArquivo, JSON.stringify(validar.errors, null, 2), (err) => {
            if (err) {
                console.error('Erro ao escrever os dados inválidos em um novo arquivo JSON:', err);
            } else {
                console.log(`Os dados inválidos foram escritos em ${nomeArquivo}`);
            }
        });
    }
}

validacao(valid);
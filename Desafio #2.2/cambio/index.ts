import axios from 'axios';
import * as readline from 'readline';
import { callbackify } from 'util';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



/*async function exibirDados(response: any) {
    const { base_code, conversion_rate, target_code, convertion_result } = response.data
    console.log(`${base_code} ${valor} => ${target_code} ${convertion_result}`);
    console.log(`Taxa: ${conversion_rate}`);

}*/

async function main() {
    try {
        const moedaDeOrigem = await pergunta('Moeda origem: ');
        const moedaDeTroca = await pergunta('Moeda troca: ');
        const valor = await pergunta('Valor: ');

        
        async function exibirDados(response: any) {
            const { base_code, conversion_rate, target_code, conversion_result } = response.data
            console.log(`${base_code} ${valor} => ${target_code} ${conversion_result}`);
            console.log(`Taxa: ${conversion_rate}`);
        
        }


        const response = await axios.get(`https://v6.exchangerate-api.com/v6/1764e01d7147452a19bfa131/pair/${moedaDeOrigem}/${moedaDeTroca}/${valor}`);
    
        await exibirDados(response);

    } catch (error) {
        console.error('Erro encontrado:', error);
    } finally {
        rl.close();
    }
}



(async () => {
    await main();
})();

function pergunta(pergunta: string): Promise<string> {
    return new Promise((resolve, reject) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}


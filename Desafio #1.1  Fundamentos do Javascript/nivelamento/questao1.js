// Definição da classe Vertice
class Vertice {
    // Declaração de atributos privados #x e #y usando a sintaxe de campos privados
    #x;
    #y;

    // Construtor da classe para inicializar os valores de x e y
    constructor(x, y) {
        // Atribuição dos valores recebidos como parâmetros aos atributos privados
        this.#x = x;
        this.#y = y;
    }

    // Getter para acessar o valor do atributo x
    get x() {
        return this.#x;
    }

    // Getter para acessar o valor do atributo y
    get y() {
        return this.#y;
    }

    // Método para calcular a distância euclidiana entre dois vértices
    distancia(outroVertice) {
        // Cálculo das diferenças em x e y entre os vértices
        const deltaX = outroVertice.x - this.#x;
        const deltaY = outroVertice.y - this.#y;
        // Cálculo da distância euclidiana usando o teorema de Pitágoras
        return Math.sqrt(deltaX ** 2 + deltaY ** 2);
    }

    // Método para mover o vértice para outra posição (x, y)
    move(novoX, novoY) {
        // Atribuição dos novos valores de x e y aos atributos privados
        this.#x = novoX;
        this.#y = novoY;
    }

    // Método para verificar se dois vértices são iguais
    equals(outroVertice) {
        // Verificação se as coordenadas dos dois vértices são idênticas
        return this.#x === outroVertice.x && this.#y === outroVertice.y;
    }
}

// Função para ler valores do usuário e realizar operações com a classe Vertice
function lerValoresDoUsuario() {
    // Solicita ao usuário os valores para os três vértices
    const x1 = parseFloat(prompt("Digite o valor de x para o primeiro vértice:"));
    const y1 = parseFloat(prompt("Digite o valor de y para o primeiro vértice:"));
    const x2 = parseFloat(prompt("Digite o valor de x para o segundo vértice:"));
    const y2 = parseFloat(prompt("Digite o valor de y para o segundo vértice:"));
    const x3 = parseFloat(prompt("Digite o valor de x para o terceiro vértice:"));
    const y3 = parseFloat(prompt("Digite o valor de y para o terceiro vértice:"));

    // Cria três instâncias da classe Vertice com os valores fornecidos pelo usuário
    const vertice1 = new Vertice(x1, y1);
    const vertice2 = new Vertice(x2, y2);
    const vertice3 = new Vertice(x3, y3);

    // Chamando os métodos da classe Vertice com os vértices criados e exibindo os resultados
    console.log("Distância entre o primeiro e o segundo vértice:", vertice1.distancia(vertice2));
    console.log("Distância entre o primeiro e o terceiro vértice:", vertice1.distancia(vertice3));
    console.log("Os vértices 1 e 2 são iguais?", vertice1.equals(vertice2));
    console.log("Os vértices 1 e 3 são iguais?", vertice1.equals(vertice3));

    // Solicita ao usuário novos valores de coordenadas para mover o terceiro vértice
    const novoX = parseFloat(prompt("Digite o novo valor de x para mover o terceiro vértice:"));
    const novoY = parseFloat(prompt("Digite o novo valor de y para mover o terceiro vértice:"));
    
    // Move o terceiro vértice para a nova posição especificada
    vertice3.move(novoX, novoY);
    console.log("Nova posição do terceiro vértice:", vertice3.x, vertice3.y);
}

// Chamada da função para ler os valores do usuário e realizar as operações com a classe Vertice
lerValoresDoUsuario();

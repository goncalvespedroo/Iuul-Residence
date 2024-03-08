class Vertice {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}

class Poligono {
    #vertices;

    constructor(...vertices) {
        // Verifica se há pelo menos 3 vértices
        if (vertices.length < 3) {
            throw new Error("Um polígono deve ter pelo menos 3 vértices.");
        }

        // Verifica se há vértices repetidos
        const conjuntoVertices = new Set(vertices);
        if (conjuntoVertices.size !== vertices.length) {
            throw new Error("Não são permitidos vértices repetidos.");
        }

        this.#vertices = vertices;
    }

    addVertice(vertice) {
        // Verifica se o vértice já existe no polígono
        if (this.#vertices.some(v => v.x === vertice.x && v.y === vertice.y)) {
            return false;
        }

        // Adiciona o vértice ao polígono
        this.#vertices.push(vertice);
        return true;
    }

    get perimetro() {
        let perimetro = 0;
        for (let i = 0; i < this.#vertices.length; i++) {
            const verticeAtual = this.#vertices[i];
            const proximoVertice = this.#vertices[(i + 1) % this.#vertices.length];
            perimetro += Math.sqrt((proximoVertice.x - verticeAtual.x) ** 2 + (proximoVertice.y - verticeAtual.y) ** 2);
        }
        return perimetro;
    }

    get qtdVertices() {
        return this.#vertices.length;
    }
}

// Função para ler valores do usuário e criar um polígono
function criarPoligono() {
    const vertices = [];
    let continuarAdicionando = true;

    while (continuarAdicionando) {
        const x = parseFloat(prompt("Digite o valor de x para o vértice:"));
        const y = parseFloat(prompt("Digite o valor de y para o vértice:"));
        const vertice = new Vertice(x, y);

        const poligono = new Poligono(...vertices);
        if (!poligono.addVertice(vertice)) {
            console.log("Este vértice já foi adicionado.");
        } else {
            vertices.push(vertice);
        }

        continuarAdicionando = confirm("Deseja adicionar mais um vértice?");
    }

    return new Poligono(...vertices);
}

// Cria um polígono com os valores fornecidos pelo usuário
try {
    const poligono = criarPoligono();
    console.log("Perímetro do polígono:", poligono.perimetro);
    console.log("Quantidade de vértices do polígono:", poligono.qtdVertices);
} catch (error) {
    console.log(error.message);
}

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

class Triangulo {
    #vertice1;
    #vertice2;
    #vertice3;

    constructor(vertice1, vertice2, vertice3) {
        // Verifica se os vértices fornecidos formam um triângulo
        if (!this.eTriangulo(vertice1, vertice2, vertice3)) {
            throw new Error("Os vértices fornecidos não formam um triângulo válido.");
        }

        this.#vertice1 = vertice1;
        this.#vertice2 = vertice2;
        this.#vertice3 = vertice3;
    }

    // Método privado para verificar se os vértices formam um triângulo válido
    eTriangulo(vertice1, vertice2, vertice3) {
        // Calcula os lados do triângulo
        const lado1 = Math.sqrt((vertice2.x - vertice1.x) ** 2 + (vertice2.y - vertice1.y) ** 2);
        const lado2 = Math.sqrt((vertice3.x - vertice2.x) ** 2 + (vertice3.y - vertice2.y) ** 2);
        const lado3 = Math.sqrt((vertice1.x - vertice3.x) ** 2 + (vertice1.y - vertice3.y) ** 2);
        
        // Verifica se a soma de dois lados é maior que o terceiro para cada combinação de lados
        return lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1;
    }

    // Método para verificar se dois triângulos são iguais
    equals(outroTriangulo) {
        return this.#vertice1.equals(outroTriangulo.#vertice1) &&
               this.#vertice2.equals(outroTriangulo.#vertice2) &&
               this.#vertice3.equals(outroTriangulo.#vertice3);
    }

    // Método para calcular o perímetro do triângulo
    get perimetro() {
        const lado1 = Math.sqrt((this.#vertice2.x - this.#vertice1.x) ** 2 + (this.#vertice2.y - this.#vertice1.y) ** 2);
        const lado2 = Math.sqrt((this.#vertice3.x - this.#vertice2.x) ** 2 + (this.#vertice3.y - this.#vertice2.y) ** 2);
        const lado3 = Math.sqrt((this.#vertice1.x - this.#vertice3.x) ** 2 + (this.#vertice1.y - this.#vertice3.y) ** 2);
        return lado1 + lado2 + lado3;
    }

    // Método para determinar o tipo do triângulo (equilátero, isósceles ou escaleno)
    tipo() {
        const lado1 = Math.sqrt((this.#vertice2.x - this.#vertice1.x) ** 2 + (this.#vertice2.y - this.#vertice1.y) ** 2);
        const lado2 = Math.sqrt((this.#vertice3.x - this.#vertice2.x) ** 2 + (this.#vertice3.y - this.#vertice2.y) ** 2);
        const lado3 = Math.sqrt((this.#vertice1.x - this.#vertice3.x) ** 2 + (this.#vertice1.y - this.#vertice3.y) ** 2);
        
        if (lado1 === lado2 && lado2 === lado3) {
            return "equilátero";
        } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
            return "isósceles";
        } else {
            return "escaleno";
        }
    }

    // Método para clonar um triângulo
    clone() {
        return new Triangulo(this.#vertice1, this.#vertice2, this.#vertice3);
    }

    // Método para calcular a área do triângulo
    get area() {
        const lado1 = Math.sqrt((this.#vertice2.x - this.#vertice1.x) ** 2 + (this.#vertice2.y - this.#vertice1.y) ** 2);
        const lado2 = Math.sqrt((this.#vertice3.x - this.#vertice2.x) ** 2 + (this.#vertice3.y - this.#vertice2.y) ** 2);
        const lado3 = Math.sqrt((this.#vertice1.x - this.#vertice3.x) ** 2 + (this.#vertice1.y - this.#vertice3.y) ** 2);
        const semiperimetro = this.perimetro / 2;
        return Math.sqrt(semiperimetro * (semiperimetro - lado1) * (semiperimetro - lado2) * (semiperimetro - lado3));
    }
}

// Exemplo de uso:
const vertice1 = new Vertice(0, 0);
const vertice2 = new Vertice(0, 4);
const vertice3 = new Vertice(3, 0);

try {
    const triangulo = new Triangulo(vertice1, vertice2, vertice3);
    console.log("Perímetro:", triangulo.perimetro);
    console.log("Tipo:", triangulo.tipo());
    console.log("Área:", triangulo.area);
} catch (error) {
    console.log(error.message);
}

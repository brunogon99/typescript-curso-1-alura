export class Negociacoes {
    constructor() {
        this.negociacoes = []; // é o mesmo que Array<Negociacao>
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        return this.negociacoes;
    }
}

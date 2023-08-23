import { Negociacao } from "./negociacao.js";

export class Negociacoes {
    private negociacoes: Negociacao[] = []; // é o mesmo que Array<Negociacao>

    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao)
    }

    public lista(): readonly Negociacao[] { // é o mesmo que ReadonlyArray<Negociacao>
        return this.negociacoes;
    }
}

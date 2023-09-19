import { NegociacoesDoDia } from '../interfaces/negociacao-do-dia.js';
import { Negociacao } from '../models/negociacao.js';
export class NegociacaoService {

    public obterNegociacaoDoDia(): Promise<Negociacao[]> {
        return fetch('http://localhost:8080/dados')
        .then(res => {
          return res.json()
        })
        .then((dados: NegociacoesDoDia[]) => {
          return dados.map(dado => {
            return new Negociacao(new Date(), dado.vezes, dado.montante)
          })
        })
    }
}
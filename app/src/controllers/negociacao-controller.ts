import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  @domInjector('#data')
  private inputData: HTMLInputElement;
  @domInjector('#quantidade')
  private inputQuantidade: HTMLInputElement;
  @domInjector('#valor')
  private inputValor: HTMLInputElement;
  
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
    // this.inputData = <HTMLInputElement>document.querySelector('#data'); //técnica chamada de casting, 
    // //onde o programador garante o tipo que vai ser passado
    // this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
    // this.inputValor = document.querySelector('#valor') as HTMLInputElement;
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect
  @logarTempoDeExecucao(true)
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.ehDiaUtil(negociacao.data)) {
      this.mensagemView.update('Apenas negociações em dias úteis são aceitas!');
      return;
    }
    //negociacao.data.setDate(10); atribuindo um valor para utilizar a técnica de progamação defensiva, neste caso é possível realizar tal atribuição pq Date é um metodo e não um tipo liteal como string e o setDate acaba modificando o valor, mesmo com o private ou readonly
    this.negociacoes.adiciona(negociacao);
    this.limparFormulario();
    this.atualizaView();
  }

  private ehDiaUtil(data: Date) {
    return data.getDay() > DiasDaSemana.DOMINGO && 
    data.getDay() < DiasDaSemana.SABADO
  }

  public importaDados(): void {
    fetch('http://localhost:8080/dados')
    .then(res => {
      return res.json()
    })
    .then((dados: any[]) => {
      return dados.map(dado => {
        return new Negociacao(new Date(), dado.vezes, dado.montante)
      })
    }).then(negociacoesDeHoje => {
      for(let negociacao of negociacoesDeHoje) {
        this.negociacoes.adiciona(negociacao);
      }
      this.negociacoesView.update(this.negociacoes);
    })
  }

  private limparFormulario(): void {
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação adicionada com sucesso!');
  }
}
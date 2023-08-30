import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this.inputData = document.querySelector('#data');
    this.inputQuantidade = document.querySelector('#quantidade');
    this.inputValor = document.querySelector('#valor');
    this.negociacoesView.update(this.negociacoes);
  }

  public adiciona(): void {
    const negociacao = this.criaNegociacao();
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

  private criaNegociacao(): Negociacao {
    const exp = /-/g; //expressão regular onde serão mapeados todos os hiféns da string

    const date = new Date(this.inputData.value.replace(exp, ','));
    const quantidade = parseInt(this.inputQuantidade.value);
    const valor = parseFloat(this.inputValor.value);

    return new Negociacao(date, quantidade, valor);
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
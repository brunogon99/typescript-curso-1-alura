import { Comparavel } from "../interfaces/comparavel.js";
import { Imprimivel } from "../utils/imprimivel.js";

export class Negociacao implements Imprimivel, Comparavel<Negociacao> {
  /* 
  está sendo declarado diretamente no construtor, este é um recurso do typescript
  para reduzi a quantidade de código escrito.
  private _data: Date; 
   private _quantidade: number;
   private _valor: number;
  */

  constructor(
    private _data: Date,
    public readonly quantidade: number,
    public readonly valor: number
  ) {
    /*
    this._data = data;
    this._quantidade = quantidade;
    this._valor = valor;
    */
  }

  public static criaDe(dataString: string, quantidadeString: string, valorString: string): Negociacao {
    const exp = /-/g; //expressão regular onde serão mapeados todos os hiféns da string

    const date = new Date(dataString.replace(exp, ','));
    const quantidade = parseInt(quantidadeString);
    const valor = parseFloat(valorString);

    return new Negociacao(date, quantidade, valor);
  }

  get data(): Date {
    const data = new Date(this._data.getTime()); /* técnica de prog. defensiva 
    retorna uma data em milisegundos e o metodo Date resolve esse numero 
    devolvendo uma data criando uma especie de clone*/
    return data;
  }

  get volume(): number {
    return this.quantidade * this.valor;
  }

  public paraTexto(): string {
    return `
      Data: ${this.data},
      Quantidade: ${this.quantidade},
      Valor: ${this.valor}
    `;
  }

  public ehIgual(negociacao: Negociacao): boolean {
    return this.data.getDate() === negociacao.data.getDate()
      && this.data.getMonth() === negociacao.data.getMonth()
      && this.data.getFullYear() === negociacao.data.getFullYear();
  }
}

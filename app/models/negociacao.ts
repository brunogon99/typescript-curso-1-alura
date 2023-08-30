export class Negociacao {
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

  get data(): Date {
    const data = new Date(this._data.getTime()); /* técnica de prog. defensiva 
    retorna uma data em milisegundos e o metodo Date resolve esse numero 
    devolvendo uma data criando uma especie de clone*/
    return data;
  }

  get volume(): number {
    return this.quantidade * this.valor;
  }

  public static criaDe(dataString: string, quantidadeString: string, valorString : string): Negociacao {
    const exp = /-/g; //expressão regular onde serão mapeados todos os hiféns da string

    const date = new Date(dataString.replace(exp, ','));
    const quantidade = parseInt(quantidadeString);
    const valor = parseFloat(valorString);

    return new Negociacao(date, quantidade, valor);
  }
}

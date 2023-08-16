export class Negociacao {
    /*
    está sendo declarado diretamente no construtor, este é um recurso do typescript
    para reduzi a quantidade de código escrito.
    private _data: Date;
     private _quantidade: number;
     private _valor: number;
    */
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
        /*
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
        */
    }
    get data() {
        const data = new Date(this._data.getTime()); /* técnica de prog. defensiva
        retorna uma data em milisegundos e o metodo Date resolve esse numero
        devolvendo uma data criando uma especie de clone*/
        return data;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
}

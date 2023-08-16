import { Negociacoes } from "../models/negociacoes.js";

export class NegociacoesView {

  private elemento: HTMLElement;
  constructor(selector: string) {
    this.elemento = document.querySelector(selector);
  }

  template(model: Negociacoes): string {
    return `
        <table class="table table-hove table-bordered">
            <thead>
                <tr>
                  <th>DATA</th>
                  <th>QUANTIDADE</th>
                  <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
              ${model.lista().map(negociacao => {
                return `
                  <tr>
                    <td>?</td>
                    <td>${negociacao.quantidade}</td>
                    <td>${negociacao.valor}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
        </table>
        `;
  }

  update(model: Negociacoes): void {
    const template = this.template(model);
    console.log(template);
    this.elemento.innerHTML = template;
  }
}
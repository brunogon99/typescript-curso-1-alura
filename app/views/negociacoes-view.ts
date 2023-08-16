export class NegociacoesView {

  private elemento: HTMLElement;
  constructor(selector: string) {
    this.elemento = document.querySelector(selector);
  }

  template(): string {
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
            </tbody>
        </table>
        `;
  }

  update(): void {
    this.elemento.innerHTML = this.template();
  }
}
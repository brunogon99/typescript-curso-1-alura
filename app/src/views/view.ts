export abstract class View<T> {
    
    protected elemento: HTMLElement;

    constructor(selector: string) {
        const elemento = document.querySelector(selector);
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw new Error(`Seletor ${selector} não existe no DOM`);
            
        }
    }

    public update(model: T): void {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }

   protected abstract template(model: T): string;
}
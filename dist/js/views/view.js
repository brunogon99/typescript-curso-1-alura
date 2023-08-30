export class View {
    constructor(selector, escapar) {
        this.escapar = false;
        this.elemento = document.querySelector(selector);
    }
    update(model) {
        let template = this.template(model);
        if (this.escapar) {
            template = template
                .replace(/<script[\s\S]*?<\/script>>/, '');
        }
        this.elemento.innerHTML = template;
    }
}

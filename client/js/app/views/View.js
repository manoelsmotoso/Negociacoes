/**
 * @param element HTMLElement
 */
class View {
    constructor(element) {
        this._element = element;

    }
    template(model) {
        throw new Error("Voce deve inplementar o metodo template");
    }

    update(model) {
        this._element.innerHTML = this.template(model);
    }
}
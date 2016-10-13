class NegociacoesView {
    constructor(element) {
        this._element = element;
    }
    _template(){
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </tbody>
        </table> `
        ;
    }
    update(){
        this._element.innerHTML = this._template;
    }
}
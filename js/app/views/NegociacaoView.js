class NegociacaoView{
	constructor(element){
		this._element = element;
	}
	element(){
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
        </tbody>
    </table>
		`;
	}
}

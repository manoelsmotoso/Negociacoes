class NegociacaoController{
	constructor(){
		let $ = document.querySelector.bind(document);
		this._inputData =$("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputDatainputValor = $("#valor");
	}
	adiciona(){
		event.preventDefault();
		let negociacao = new Negociacao(
			new Date(this._inputData.value.replace(/-/g,',')),
			this._inputQuantidade.value,
			this._inputDatainputValor.value
		)
		console.log(negociacao);
	}
	negociacoes(){
		let negociacaoService = new NegociacaoService();

        Promise.all([
					negociacaoService.negociacoesSemanaAtual(),
					negociacaoService.negociacoesSemanaAnterior(),
					negociacaoService.negociacoesSemanaRetrasada()
        ])
        .then(negociacoes => negociacoes
        	.reduce((arrayAchatado, array) => arrayAchatado.concat(array))
        	.forEach(negociacao => console.log(negociacao)))
		.catch(erro => console.log(erro));
	}
}


let negociacaoController = new NegociacaoController();
class NegociacaoController{
	constructor(){
		let $ = document.querySelector.bind(document);
		this._inputData =$("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputDatainputValor = $("#valor");
	}


	
	adiciona(){
		event.preventDefault();
		//convertendo data do input
		let data = new Date(
			...this._inputData.value
			.split("-")
			.map((item, indice) =>item - indice % 2)
		);
		//criando uma instancio do objeto negociacao
		let negociacao = new Negociacao(
			data,
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
class NegociacaoController{
	constructor(){
		let $ = document.querySelector.bind(document);
		this._inputData =$("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputValor = $("#valor");
		this._listaNegociacoes = new ListaNegociacoes();
	}

	adiciona(event){
		event.preventDefault();
	
		//criando uma instancio do objeto negociacao
		let negociacao = new Negociacao(
			DataHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		)
		console.log(negociacao);
		this._listaNegociacoes.adiciona(negociacao);	
		this._limpaFormulario();
	}
	
    _linpaFormulario(){
	  this._inputData.value="";
	  this._inputQuantidade.value=0;
	  this._inputValor.value=0.0;
	  this._inputData.focus();
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

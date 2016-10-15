class NegociacaoController{
	constructor(){
		/**Atribuindo a funcao do querySelecto a varuaval dolar
*/
		let $ = document.querySelector.bind(document);
		this._inputData =$("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputValor = $("#valor");
		let self = this;
		/**Passando uma arraw functin que ira carregar as mudancas
		*  na view toda vez que for adicionado ou removido uma negociacao
		*/
		this._listaNegociacoes = new Proxy(new ListaNegociacoes(),
		{
			get(target, prop, reciver){
				if(['adiciona','apagar'].includes(prop) && typeof(target[prop]) == typeof(Function)){
					return function(){
						Reflect.apply(target[prop], target, arguments);
						self._negociacoesView.update(target);
					};
				}
				
				return Reflect.get(target, prop, reciver);
			}
		}
		);
		
		/**Instanciando a classe NegociacoesView e uma MenssagemView passando como parametro o 
		*  elemento que recebera o template string respectivo de cada uma.
		*/
		this._negociacoesView = new NegociacoesView($('#negociacoesView'));
		this._negociacoesView.update(this._listaNegociacoes);
		this._menssagemView = new MenssagemView($('#menssagemView'));
		this._menssagemView.update();
	}

	adiciona(event){
		/** Desbilita o submit do botao Incluir*/
		event.preventDefault();
	
		/**criando uma instacia da classe Negociacao e 
		*  passando os paremetros de uma nova negociacao
		*/
		let negociacao = new Negociacao(
			DataHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		)
		
		this._listaNegociacoes.adiciona(negociacao);	
		this._limpaFormulario();
		this._negociacoesView.update(this._listaNegociacoes);
		this._menssagemView.update("Sucesso");
	}
	/** Limpa o formulario a cada nova negociacao incluida */
    _limpaFormulario(){
	  this._inputData.value="";
	  this._inputQuantidade.value=0;
	  this._inputValor.value=0.0;
	  this._inputData.focus();
    }

	negociacoes(){
		
		let negociacaoService = new NegociacaoService();
        /** Executa  Promises em sequencia, so executa a seguinte caso
		*   a anterior tenha sido finalizada 
		*/
        Promise.all([
					negociacaoService.negociacoesSemanaAtual(),
					negociacaoService.negociacoesSemanaAnterior(),
					negociacaoService.negociacoesSemanaRetrasada()
        ])
        .then(negociacoes => negociacoes
        	.reduce((arrayAchatado, array) => arrayAchatado.concat(array))
        	.forEach(negociacao => {
				this._listaNegociacoes.adiciona(negociacao);
				
				this._menssagemView.update("Importado");
				}))
		.catch(erro => this._menssagemView.update(erro));
	}
	apagar(){
		this._listaNegociacoes.apagar();
	}
}

class NegociacaoController {
    constructor() {
        /*Atribuindo a funcao do querySelecto a varuaval dolar*/
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");     

        this._listaNegociacoes = new Bind(
        	new ListaNegociacoes(),
        	new NegociacoesView($('#negociacoesView')),
        	 'adiciona', 'apagar');

        /**/
        this._mensagem = new Bind(new Mensagem(''),
        	new MensagemView($('#mensagemView')),
        	'texto');
    }

    adiciona(event) {
            /*Desbilita o submit do botao Incluir*/
            event.preventDefault();
            /*criando uma instacia da classe Negociacao e 
             *passando os paremetros de uma nova negociacao
             */
            let negociacao = new Negociacao(
                DataHelper.textoParaData(this._inputData.value),
                this._inputQuantidade.value,
                this._inputValor.value
            );

            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = "Negociação adicionada com sucesso.";
            this._limpaFormulario();
        }
        /*Limpa os campos do formulario a cada nova negociaçâo incluida */
    _limpaFormulario() {

        this._inputData.value = "";
        this._inputQuantidade.value = 0;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    negociacoes() {

        let negociacaoService = new NegociacaoService();
        /*Executa  Promises em sequencia, so executa a seguinte caso
         *a anterior tenha sido finalizada 
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
                	this._mensagem.texto = "Negociacoes importadas com sucesso."
                	}
                )
            )
            .catch(erro => this._mensagem.texto = erro);
    }
    apagar() {

        this._listaNegociacoes.apagar();
        this._mensagem.texto = "Negociacoes apagadas com sucesso.";
    }
}

console.log("Carregou class  NegociacaoController()");

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
        	 'adiciona', 'apagar', 'ordena', 'inverteOrdem');

        /**/
        this._mensagem = new Bind(new Mensagem(),
        	new MensagemView($('#mensagemView')),
        	'texto');

        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.lista())
            .then(negociacao => { negociacao.forEach(negociacao =>{
                                    this._listaNegociacoes.adiciona(negociacao);
                                    this._mensagem.texto = "Negociacoes importadas com sucesso";
                                  })
            }).catch(erro => this._mensagem.texto = erro);
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

            ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(msg => {
                     this._listaNegociacoes.adiciona(negociacao);
                     this._limpaFormulario();
                     this._mensagem.texto = msg;
                }
            ).catch(erro => this._mensagem.texto = erro);


            
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
                 .filter(negociacao => 
				     !this._listaNegociacoes
					      .negociacoes
						  .some(sameNegociacao => JSON.stringify(negociacao)==JSON.stringify(sameNegociacao))
				).forEach(negociacao => {
                	ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(msg => {
                     this._listaNegociacoes.adiciona(negociacao);
                     this._mensagem.texto = msg;
                }
            ).catch(erro => this._mensagem.texto = erro);

}
                )
            )
            .catch(erro => this._mensagem.texto = erro);
    }

    apagar() {
		
		ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagarTodos())
            .then(msg => {
                     this._listaNegociacoes.apagar();
                     this._mensagem.texto = msg;
                }
            ).catch(erro => this._mensagem.texto = erro);

        
       // this._mensagem.texto = "Negociacoes apagadas com sucesso.";
    }

    ordena(coluna) {
        
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem(); 
        } else {
            this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);    
        }
        this._ordemAtual = coluna;    
    }
}

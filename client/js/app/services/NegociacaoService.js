console.log("Carregou class NegociacaoService()");

class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }
    negociacoesSemanaAtual() {
        return new Promise((resolve, reject) => {
        	this._http.get('http://localhost:3000/negociacoes/semana')
        .then(negociacoes =>{
        		resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
        })
        .catch(erro => reject("Não foi possivel obter as negociações na semana"));
        });
    }

    //Semana Anterior
    negociacoesSemanaAnterior() {
	    return new Promise((resolve, reject) => {
	    	this._http.get('http://localhost:3000/negociacoes/anterior')
	    .then(negociacoes =>{
	    		resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
	    })
	    .catch(erro => reject("Não foi possivel obter as negociações da semana anterior"));
	    });
    }

    //Semana Retrazada
    negociacoesSemanaRetrasada() {
	    return new Promise((resolve, reject) => {
	    	this._http.get('http://localhost:3000/negociacoes/retrasada')
	    .then(negociacoes =>{
	    		resolve(negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)))
	    })
	    .catch(erro => reject("Não foi possivel obter as negociações da semana retrasada"));
	    });
    }
	
	enviaNegociacao(negociacao){
		return new Promise((resolve, reject) => {
	    	this._http.post('http://localhost:3000/negociacoes',negociacao)
	    .then()
	    .catch(erro => reject("Não foi possivel obter as negociações da semana retrasada"));
	    });
	}
}

class NegociacaoController{
	adiciona(){
		event.preventDefault();
	}
	negociacoes(){
		let negociacaoService = new NegociacaoService();

		negociacaoService.negociacoes("semana")
			.then(negociacoes => negociacoes.forEach(negociacao => console.log(negociacao)))
			.catch(erro => console.log(erro));

		negociacaoService.negociacoes("anterior")
			.then(negociacoes => negociacoes.forEach(negociacao => console.log(negociacao)))
			.catch(erro => console.log(erro));

		negociacaoService.negociacoes("retrasada")
			.then(negociacoes => negociacoes.forEach(negociacao => console.log(negociacao)))
			.catch(erro => console.log(erro));
		
	}
}


let negociacaoController = new NegociacaoController();
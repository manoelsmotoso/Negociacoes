class NegociacaoService {
	negociacoes(periodo) {
		return new Promise((resolve, reject) => {

			let xhr = new XMLHttpRequest();
			xhr.open('GET', 'http://localhost:3000/negociacoes/'+periodo);

			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.responseText).map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor)));
					} else {
						reject("Não foi possivel obter as negociações da "+periodo+'.');
					}
				}

			};
			xhr.send();
		});
	}
}
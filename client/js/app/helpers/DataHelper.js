class DataHelper {

	static textoParaData(texto) {
		
		if (!/\d{4}-\d{2}-\d{2}/.test(texto)) throw Error("Data no fornato invalido tente aaaa-mm-dd")

		return new Date(texto.split("-").map((item, indice) => item - indice % 2)) //convertendo texto aaaa-mm-dd para Object date
	}

	static dataParaTexto(data) {

		return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
	}
}
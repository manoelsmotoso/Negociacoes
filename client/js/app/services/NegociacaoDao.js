console.log("Carregou NegociacaoDao()");
class NegociacaoDao {
    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = (e) => {
                console.log('Negociacao adicionada com sucesso.' + e.target.result);
                resolve("Negociação adiciona com sucesso.");
            }

            request.onerror = (e) => {
                console.log(e.target.error);
                reject('Erro ao adicionar negociação.');

            }
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
            let negociacoes = [];
            cursor.onsuccess = e => {
                let atual = e.target.result;
                if (atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Erro ao recuperar negociacões do banco.');
            }


        });
    }

    apagarTodos() {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = (e) => {
                console.log(e.target.result);
                resolve("Negociacões apagadas com sucesso");
            }

            request.onerror = (e) => {
                console.log(e.target.error);
                reject('Erro ao apagar negociacões.');

            }
        });
    }

}

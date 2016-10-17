let dbName = 'aluraframe';
let version = 1;
let stores = ['negociacoes']

class ConnectionFactory {
	constrictor() {
		throw new Error("Você não pode instanciar a classe ConnectionFactory pois seus metodos são staticos.");
	}

	static getConnection() {
		return new Promise((resolve, reject) => {
			let openRequest = window.indexedDB.open(dbName, version);

			openRequest.onupgradeneeded = e => {
				ConnectionFactory._createStores(e.target.result)
				console.log('Object Store criado ou atualizado');
			}

			openRequest.onsuccess = e => {
				resolve(e.target.result)

			}

			openRequest.onerror = e => {
				console.log(e.target.error);
				reject(e.target.error)
			}
		});

	}


	static _createStores(connection) {
		stores.forEach(store => {
			if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

			connection.createObjectStore(store, {
				autoIncrement: true
			});


		})


	}
}

//ConnectionFactory.getConnection();
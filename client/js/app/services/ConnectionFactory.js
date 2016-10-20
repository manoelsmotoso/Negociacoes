
alert("hsjd");

var ConnectionFactory = (function() {
	var dbName = 'aluraframe';
	var version = 2;
	var stores = ['negociacoes'];
	var connection=null;
	var close = null;
	return class ConnectionFactory{
		constrictor() {
			throw new Error("Você não pode instanciar a classe ConnectionFactory pois seus metodos são staticos.");
		}

		static getConnection() {
			return new Promise((resolve, reject) => {
			var openRequest = window.indexedDB.open(dbName, version);

			openRequest.onupgradeneeded = e = > {
			ConnectionFactory._createStores(e.target.result);
			console.log('Object Store criado ou atualizado');
			alert("Object store criado");
		}

		openRequest.onsuccess = e = > {
		if (!connection)
		{
			connection = e.target.result;
			alert("Object store instanciado");
			//close = connection.close.bind(connection);
			//connection.close = () => throw new Error("Voce nao pode fechar a conexao diretamente");

		}
		resolve(connection);

	}

	openRequest.onerror = e = > {
	   console.log(e.target.error);
	   reject(e.target.error.name); 
	}


	static _createStores(connection) {
		stores.forEach(store => {
			if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
            connection.createObjectStore(store, { autoIncrement: true });

		})


	}
	
	static closeConnection(){
		close();
		connection = null;
	 }
   }
 }
})();

//ConnectionFactory.getConnection();



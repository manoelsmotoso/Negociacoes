let ConnectionFactory = (function () {

    const dbName = 'aluraframe',
        version = 1,
        stores = ['negociacoes']

    let connection = null
    let close = null

    return class ConnectionFactory {

        constrictor() {

            throw new Error("Você não pode instanciar a classe ConnectionFactory pois seus metodos são staticos.")
        }

        static getConnection() {

            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version)

                openRequest.onupgradeneeded = e => {

                    ConnectionFactory._createStores(e.target.result)
                    console.log('ObjectStore [' + stores + '] criado ou atualizado')
                }

                openRequest.onsuccess = e => {

                    if (!connection) {

                        connection = e.target.result
                        close = connection.close.bind(connection)

                        connection.close = () => {
                            throw new Error("Voce não pode fechar a conéxão diretamente")
                        }
                    }

                    console.log('Conexão instanciada com sucesso')

                    resolve(connection)
                }

                openRequest.onerror = e => {

                    console.log(e.target.error)
                    reject(e.target.error.name)
                }

            })
        }

        static _createStores(connection) {

            stores.forEach(store => {

                if (connection.objectStoreNames.contains(store)) {

                    connection.deleteObjectStore(store)
                }

                connection.createObjectStore(store, {

                    autoIncrement: true
                })
            })
        }

        static closeConnection() {
            
            close()
            connection = null
        }
    }
})()
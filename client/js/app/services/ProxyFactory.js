class ProxyFactory {

    static create(object, props, action) {

        return new Proxy(object, {

            get(target, prop, receiver) {

                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

                    return function () {
                        console.log(`interceptando ${prop} de ${target[prop]}`)
                        Reflect.apply(target[prop], target, arguments)

                        return action(target)

                    }
                }

                return Reflect.get(target, prop, receiver)
            },

            set(target, prop, value, receiver) {

                if (props.includes(prop)) {
                    console.log(`interceptando ${prop} de ${target[prop]}`)
                    action(target)
                }

                return Reflect.set(target, prop, value, receiver)
            }
        })

    }
    
    static _ehFuncao(func) {

        return typeof (func) == typeof (Function)
    }
}
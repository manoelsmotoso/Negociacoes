class NegociacoesView extends View {
    constructor(element) {
        super(element);

    }
    template(model) {
            return `
             <table class="table table-hover table-bordered">
                          <thead>
                              <tr class="active">
                                  <th onclick="negociacaoController.ordena('data')">DATA</th>
                                  <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                                  <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                                  <th onclick="negociacaoControl ler.ordena('volume')">VOLUME</th>
                              </tr>
                          </thead>
                          <tbody>
                            ${model.negociacoes.map(n => 
                              `<tr>
                                   <td>${DataHelper.dataParaTexto(n.data)}</td>
                                   <td>${n.quantidade}</td>
                                   <td>${n.valor}</td>
                                   <td>${n.volume}</td>
                              </tr>` 
                            ).join('')
                           }
                          </tbody>
                          <tfoot>
                            <td colspan="3">Total</td>
                            <td class="active">
                                ${model.negociacoes.reduce((total, n)=> total + n.volume,0.0)}
                            </td>
                          </tfoot>
                  </table>
                  `
        ;
    }
}
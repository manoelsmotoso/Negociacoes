class MenssagemView extends View {
    constructor(element) {
        super(element);
		
    }
    template(model = ''){
         return model ? `<p class="alert alert-info">${model}</p>` : `<p></p>`;
   }
		
}

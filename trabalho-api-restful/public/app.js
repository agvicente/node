const controller = {
    init : async function(){
        await model.getProdutos()
        .then(() => {
            view.renderProdutos(model.produtos);
        });
        // controller.listenerCadastroProduto();
    },

    // listenerCadastroProduto : function(){
    //     botaoCadastrar = document.querySelector('#cadastrar');
    //     botaoCadastrar.addEventListener('click', function(){
    //         const produto = view.getProduto();
    //         model.postProduto(produto)
    //         .then(res => {
    //             model.produtos.push(res);
    //             view.renderProdutos(model.produtos);
    //         })
    //     })
    // }
}

const view = {

    renderProdutos : function(produtos){
        const bodyTable = document.querySelector('#body-table');
        bodyTable.innerHTML = '';
        for(let p in produtos){
            bodyTable.innerHTML += `
                <tr>
                    <td>${produtos[p].id}</td>
                    <td>${produtos[p].descricao}</td>
                    <td>${produtos[p].valor}</td>
                    <td>${produtos[p].marca}</td>
                </tr>
            `
        }
    },

    getProduto : function(){
        const descricao = document.querySelector('#descricao').value;
        const valor = document.querySelector('#valor').value;
        const marca = document.querySelector('#marca').value;
        const produto = {
            descricao : descricao,
            valor : valor,
            marca : marca
        }
        return produto;
    }
}

const model = {

    produtos : [],
    
    getProdutos : async function(){
       let _produtos = await fetch('http://localhost:3000/api/v1/produtos')
                    .then(res => res.json())
        model.produtos = _produtos.produtos;
    },

    postProduto : async function(produto){
        
        let _produto = await fetch('http://localhost:3000/api/v1/produtos', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(produto)
        })
        .then(res => {console.log(res)}, console.log(res.json()))
        .then(() => {
            return _produto;
        })
    }

}

controller.init();
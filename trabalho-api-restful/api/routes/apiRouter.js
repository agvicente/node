const express = require('express');
let apiRouter = express.Router()

const endpoint = '/'

const lista_produtos = {
    produtos: [
            { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
            { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
            { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
            { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
            { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
        ]
} 

apiRouter.get (endpoint + 'produtos', function (req, res) {
 res.status(200).json (lista_produtos)
});

apiRouter.get (endpoint + 'produtos/:id', function (req, res) {
    let id = req.params.id;
    produtos = lista_produtos.produtos;
    for(let i = 0; i < produtos.length; i++){
        if(produtos[i].id == id){
            res.status(200).json(produtos[i]);
            return;
        }       
    }
    res.status(404).json({mensagem: "Produto não encontrado"});
});

apiRouter.post (endpoint + 'produtos', function (req, res) {
    let produto = req.body;
    let id = lista_produtos.produtos.length + 1;
    produto.id = id;
    for(let i = 0; i < lista_produtos.produtos.length; i++){
        if(lista_produtos.produtos[i].descricao == produto.descricao){
            res.status(409).json({mensagem: "Produto já cadastrado"});
            return;
        }
    }
    lista_produtos.produtos.push(produto);
    res.status(201).json(produto);
});

apiRouter.put (endpoint + 'produtos/:id', function (req, res) {
    let id = req.params.id;
    let produto = req.body;
    for(let i = 0; i < lista_produtos.produtos.length; i++){
        if(lista_produtos.produtos[i].id == id){
            lista_produtos.produtos[i] = produto;
            res.status(200).json(produto);
        }
    }
    res.status(404).json({mensagem: "Produto não encontrado"});
});

apiRouter.delete (endpoint + 'produtos/:id', function (req, res) {
    let id = req.params.id;
    for(let i = 0; i < lista_produtos.produtos.length; i++){
        if(lista_produtos.produtos[i].id == id){
            lista_produtos.produtos[i] = null;
            new_lista_produtos = [];
            for(let j = 0; j < lista_produtos.produtos.length; j++){
                if(lista_produtos.produtos[j] != null){
                    new_lista_produtos.push(lista_produtos.produtos[j]);
                }
            }
            lista_produtos.produtos = new_lista_produtos;
            res.status(200).json({mensagem: "Produto removido com sucesso"});
        }
    }
    res.status(404).json({mensagem: "Produto não encontrado"});
});

module.exports = apiRouter;
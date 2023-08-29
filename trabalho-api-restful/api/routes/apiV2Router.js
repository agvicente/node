const express = require('express');
let apiV1Router = express.Router()

const endpoint = '/'

const knex = require('knex')(
    require('../knexfile')['development']  
)


apiV1Router.get (endpoint + 'produtos', function (req, res) {
 res.status(200).json (lista_produtos)
});

apiV1Router.get (endpoint + 'produtos/:id', function (req, res) {
    let id = req.params.id;
    produtos = lista_produtos.produtos;
    const idx = produtos.findIndex((item) => item.id == id);
    if(idx > -1){
        res.status(200).json(produtos[idx]);
        return;
    }
    res.status(404).json({mensagem: "Produto não encontrado"});
});

apiV1Router.post (endpoint + 'produtos', function (req, res) {
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

apiV1Router.put (endpoint + 'produtos/:id', function (req, res) {
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

apiV1Router.delete (endpoint + 'produtos/:id', function (req, res) {
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

module.exports = apiV1Router;
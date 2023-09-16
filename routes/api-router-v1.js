var express = require('express');
var apiRouterV1 = express.Router();

var produtos = [
  {"id": 1, "descricao":"Produto 1", "marca": "Marca" ,"preco": 100},
  {"id": 2, "descricao":"Produto 2", "marca": "Marca" ,"preco": 200},
  {"id": 3, "descricao":"Produto 3", "marca": "Marca" ,"preco": 300},
  {"id": 4, "descricao":"Produto 4", "marca": "Marca" ,"preco": 400},
  {"id": 5, "descricao":"Produto 5", "marca": "Marca" ,"preco": 500},
  {"id": 6, "descricao":"Produto 6", "marca": "Marca" ,"preco": 600},
  {"id": 7, "descricao":"Produto 7", "marca": "Marca" ,"preco": 700},
  {"id": 8, "descricao":"Produto 8", "marca": "Marca" ,"preco": 800},
  {"id": 9, "descricao":"Produto 9", "marca": "Marca" ,"preco": 900}
]

/* GET home page. */
apiRouterV1.get('/produtos', function(req, res, next) {
  res.json(produtos);
});

apiRouterV1.get('/produtos/:id', function(req, res, next) {
  const id = req.params.id;
  const produto = produtos.find(p => p.id == id);
  if(produto) {
    res.json(produto);
  } else {
    res.status(404).json({"message" : "Produto não encontrado"}).send();
  }
});

apiRouterV1.post('/produtos', function(req, res, next) {
  const produto = req.body;
  produto.id = produtos.length + 1;
  produtos.push(produto);
  res.status(201).json(produto).send();
});

apiRouterV1.delete('/produtos/:id', function(req, res, next) {
  const id = req.params.id;
  const produto = produtos.find(p => p.id == id);
  if(produto) {
    produtos = produtos.filter(p => p.id != id);
    res.status(200).json(produto).send();
  } else {
    res.status(404).json({"message" : "Produto não encontrado"}).send();
  }
});

apiRouterV1.put('/produtos/:id', function(req, res, next) {
  const id = req.params.id;
  const produto = produtos.find(p => p.id == id);
  if(produto) {
    const produtoAtualizado = req.body;
    produtoAtualizado.id = produto.id;
    produtos = produtos.map(p => p.id == id ? produtoAtualizado : p);
    res.status(200).json(produtoAtualizado).send();
  } else {
    res.status(404).json({"message" : "Produto não encontrado"}).send();
  }
});

module.exports = apiRouterV1;

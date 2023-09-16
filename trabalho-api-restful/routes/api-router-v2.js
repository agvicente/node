var express = require('express');
var apiRouterV2 = express.Router();
const knex = require('knex')(require('../knexfile').development);

/* GET home page. */
apiRouterV2.get('/produtos', function(req, res, next) {
  knex('produtos')
    .select("*")
    .then(produtos => res.status(200).json(produtos))
    .catch(err => {
      console.log(err);
      res.status(500).json({"message" : `Erro ao acessar o banco de dados: ${err.message}`}).send();
    });
});

apiRouterV2.get('/produtos/:id', function(req, res, next) {
  const id = req.params.id;
  knex('produtos')
    .select("*")
    .where('id', id)
    .then(produtos => {
      if(produtos.length > 0) {
        res.status(200).json(produtos[0]);
      } else {
        res.status(404).json({"message" : "Produto não encontrado"}).send();
      }
    });
});

apiRouterV2.post('/produtos', function(req, res, next) {
  const produto = req.body;
  knex('produtos')
    .insert(produto)
    .then(ids => {
      produto.id = ids[0];
      res.status(201).json(produto).send();
    }
    ).catch(err => {
      console.log(err);
      res.status(400).json({"message" : `Erro ao inserir produto: ${err.message}`}).send();
    });
});

apiRouterV2.delete('/produtos/:id', function(req, res, next) {
  const id = req.params.id;
  knex('produtos')
    .where('id', id)
    .del()
    .then(produtos => {
      if(produtos > 0) {
        res.status(200).json({"message" : "Produto excluído com sucesso"}).send();
      } else {
        res.status(404).json({"message" : "Produto não encontrado"}).send();
      }
    });
});

apiRouterV2.put('/produtos/:id', function(req, res, next) {
  const id = req.params.id;
  const produto = req.body;
  knex('produtos')
    .where('id', id)
    .update(produto)
    .then(produtos => {
      if(produtos > 0) {
        produto.id = id;
        res.status(200).json(produto).send();
      } else {
        res.status(404).json({"message" : "Produto não encontrado"}).send();
      }
    });
});

module.exports = apiRouterV2;

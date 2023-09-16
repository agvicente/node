/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('produtos').del()
  await knex('produtos').insert([
    {"id": 1, "descricao":"Produto 1", "marca": "Marca" ,"preco": 100},
    {"id": 2, "descricao":"Produto 2", "marca": "Marca" ,"preco": 200},
    {"id": 3, "descricao":"Produto 3", "marca": "Marca" ,"preco": 300},
    {"id": 4, "descricao":"Produto 4", "marca": "Marca" ,"preco": 400},
    {"id": 5, "descricao":"Produto 5", "marca": "Marca" ,"preco": 500},
    {"id": 6, "descricao":"Produto 6", "marca": "Marca" ,"preco": 600},
    {"id": 7, "descricao":"Produto 7", "marca": "Marca" ,"preco": 700},
    {"id": 8, "descricao":"Produto 8", "marca": "Marca" ,"preco": 800},
    {"id": 9, "descricao":"Produto 9", "marca": "Marca" ,"preco": 900}
  ]);
};

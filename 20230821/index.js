const express = require('express');

const app = express();
app.use('/', express.urlencoded({extended: true}));
app.use('/blog', express.static('public'));

app.use((req, res, next) => {
    console.log(new Date().toLocaleDateString(), req.method, req.url);
    next();
});
//app.post('/', express.json());

app.get('/', (req, res) => {res.send(
    `<form method="POST">
        <input type="text" name="nome"></input>
        <input type="submit" value="ok"></input>
    </form>`
)});

app.post('/', (req, res) => { 
    res.send(`Olá ${req.body.nome}`);
});

app.use((req, res) => {
    res.status(404).send('Recurso não encontrado');
});

app.listen(3000, () => {
  console.log('Server is running...');
});
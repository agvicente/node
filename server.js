const http = require('http');


//Processamento de requisições por meio de uma callback
const server = http.createServer((req, res) => {
  res.end('Hello World');
});


//Conexão do servidor HTTP com a porta 3000 do sistema operacional
server.listen(3000, () => {
  console.log('Server is running...');
});
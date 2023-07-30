import express, {Request, Response} from 'express';

const server = express();

server.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello World!</h1>');
});

server.listen(3000);
import express, {Request, Response} from 'express';

const server = express();

server.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello World!</h1>');
});

server.get('/noticias/:slug', (req: Request, res: Response) => {
    let slug: string = req.params.slug;
    res.send(`Noticia ${slug}`);
});

server.listen(3000);
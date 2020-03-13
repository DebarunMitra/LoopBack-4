import {Request, Response} from 'express';
import express from 'express';

const legacyApp = express();

// your existing Express routes
legacyApp.get('/', function(_req: Request, res: Response) {
  res.send('dogs!');
});

legacyApp.get('/pug', function(_req: Request, res: Response) {
  res.send('Pug!');
});

export {legacyApp};

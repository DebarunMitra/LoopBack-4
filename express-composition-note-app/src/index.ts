import {ApplicationConfig} from '@loopback/core';
import {ExpressCompositionNoteAppApplication} from './application';
import {ExpressServer} from './server';

export {ExpressServer, ExpressCompositionNoteAppApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new ExpressCompositionNoteAppApplication(options);
  await app.boot();
  await app.start();

  // const url = app.restServer.url;
  // console.log(`Server is running at ${url}`);
  // console.log(`Try ${url}/ping`);
  console.log('Server is running at http://127.0.0.1:3000');

  return app;
}

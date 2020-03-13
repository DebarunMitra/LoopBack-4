import {SsoLoginApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {SsoLoginApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new SsoLoginApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-express-composition
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {ApplicationConfig} from '@loopback/core';
import express, {Request, Response} from 'express';
import http from 'http';
import pEvent from 'p-event';
import path from 'path';
import {NoteApplication} from './application';
import passport from 'passport';
import './passport/passport';

export class ExpressServer {
  private app: express.Application;
  public readonly lbApp: NoteApplication;
  private server?: http.Server;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new NoteApplication(options);

    // Expose the front-end assets via Express, not as LB4 route
    this.app.use('/api', this.lbApp.requestHandler);

    // Custom Express routes
    this.app.get('/', function(_req: Request, res: Response) {
      res.sendFile(path.join(__dirname, '../public/express.html'));
    });
    this.app.get('/hello', function(_req: Request, res: Response) {
      res.send('Hello world!');
    });

    //start google route
    this.app.get(
      '/auth/google',
      passport.authenticate('google', {scope: ['profile', 'email']}),
    );

    this.app.get(
      '/auth/google/callback',
      passport.authenticate('google', {failureRedirect: '/'}),
      (req, res) => {
        //res.redirect('/dashboard');
        res.send('Welcome user');
      },
    );

    this.app.get('/auth/verify', (req, res) => {
      if (req.user) {
        console.log(req.user);
      } else {
        console.log('not authenticate');
      }
    });

    this.app.get('/auth/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });

    //end google route

    // Serve static files in the public folder
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  public async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port || 5020;
    const host = this.lbApp.restServer.config.host ?? 'localhost';
    this.server = this.app.listen(port, host);
    await pEvent(this.server, 'listening');
  }

  // For testing purposes
  public async stop() {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    await pEvent(this.server, 'close');
    this.server = undefined;
  }
}

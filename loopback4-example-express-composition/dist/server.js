"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-express-composition
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const p_event_1 = tslib_1.__importDefault(require("p-event"));
const path_1 = tslib_1.__importDefault(require("path"));
const application_1 = require("./application");
const passport_1 = tslib_1.__importDefault(require("passport"));
require("./passport/passport");
class ExpressServer {
    constructor(options = {}) {
        this.app = express_1.default();
        this.lbApp = new application_1.NoteApplication(options);
        // Expose the front-end assets via Express, not as LB4 route
        this.app.use('/api', this.lbApp.requestHandler);
        // Custom Express routes
        this.app.get('/', function (_req, res) {
            res.sendFile(path_1.default.join(__dirname, '../public/express.html'));
        });
        this.app.get('/hello', function (_req, res) {
            res.send('Hello world!');
        });
        //start google route
        this.app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
        this.app.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
            //res.redirect('/dashboard');
            res.send('Welcome user');
        });
        this.app.get('/auth/verify', (req, res) => {
            if (req.user) {
                console.log(req.user);
            }
            else {
                console.log('not authenticate');
            }
        });
        this.app.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });
        //end google route
        // Serve static files in the public folder
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
    }
    async boot() {
        await this.lbApp.boot();
    }
    async start() {
        var _a;
        await this.lbApp.start();
        const port = this.lbApp.restServer.config.port || 5020;
        const host = (_a = this.lbApp.restServer.config.host) !== null && _a !== void 0 ? _a : 'localhost';
        this.server = this.app.listen(port, host);
        await p_event_1.default(this.server, 'listening');
    }
    // For testing purposes
    async stop() {
        if (!this.server)
            return;
        await this.lbApp.stop();
        this.server.close();
        await p_event_1.default(this.server, 'close');
        this.server = undefined;
    }
}
exports.ExpressServer = ExpressServer;
//# sourceMappingURL=server.js.map
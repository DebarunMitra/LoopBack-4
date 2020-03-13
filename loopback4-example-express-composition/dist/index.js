"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-express-composition
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
exports.ExpressServer = server_1.ExpressServer;
async function main(options = {}) {
    const server = new server_1.ExpressServer(options);
    await server.boot();
    await server.start();
    console.log('Server is running at http://127.0.0.1:5020');
}
exports.main = main;
//# sourceMappingURL=index.js.map
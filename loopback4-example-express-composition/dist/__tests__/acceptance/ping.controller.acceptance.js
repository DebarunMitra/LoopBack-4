"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-express-composition
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const test_helper_1 = require("./test-helper");
describe('PingController', () => {
    let server;
    let client;
    before('setupApplication', async () => {
        ({ server, client } = await test_helper_1.setupExpressApplication());
    });
    after('closes application', async () => {
        await server.stop();
    });
    it('invokes GET /ping', async () => {
        const res = await client.get('/api/ping?msg=world').expect(200);
        testlab_1.expect(res.body).to.containEql({ greeting: 'Hello from LoopBack' });
    });
});
//# sourceMappingURL=ping.controller.acceptance.js.map
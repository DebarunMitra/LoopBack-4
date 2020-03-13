"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-express-composition
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const test_helper_1 = require("./test-helper");
const repositories_1 = require("../../repositories");
describe('NoteApplication', () => {
    let server;
    let client;
    let lbApp;
    let noteRepo;
    before('setupApplication', async () => {
        ({ server, client, lbApp } = await test_helper_1.setupExpressApplication());
        await changeDataSourceConfig();
        await givenNoteRepository();
    });
    beforeEach(async () => {
        await noteRepo.deleteAll();
    });
    after('closes application', async () => {
        await server.stop();
    });
    it('creates a note', async function () {
        const note = test_helper_1.givenNote();
        const response = await client
            .post('/api/notes')
            .send(note)
            .expect(200);
        testlab_1.expect(response.body).to.containDeep(note);
        const result = await noteRepo.findById(response.body.id);
        testlab_1.expect(result).to.containDeep(note);
    });
    it('gets notes', async () => {
        const note = test_helper_1.givenNote();
        let response = await client.get('/api/notes').expect(200);
        testlab_1.expect(response.body).to.be.empty();
        await client
            .post('/api/notes')
            .send(note)
            .expect(200);
        response = await client.get('/api/notes').expect(200);
        testlab_1.expect(response.body).to.not.be.empty();
    });
    it('displays static front page from Note app', async () => {
        await client
            .get('/api/')
            .expect(200)
            .expect('Content-Type', /text\/html/)
            .expect(/<h1>express-composition/);
    });
    async function givenNoteRepository() {
        noteRepo = await lbApp.getRepository(repositories_1.NoteRepository);
    }
    async function changeDataSourceConfig() {
        /**
         * Override default config for DataSource for testing so we don't write
         * test data to file when using the memory connector.
         */
        lbApp.bind('datasources.config.ds').to({
            name: 'ds',
            connector: 'memory',
        });
    }
});
//# sourceMappingURL=note.acceptance.js.map
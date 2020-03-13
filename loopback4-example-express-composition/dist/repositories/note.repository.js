"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-express-composition
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let NoteRepository = class NoteRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Note, dataSource);
    }
};
NoteRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.ds')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.DsDataSource])
], NoteRepository);
exports.NoteRepository = NoteRepository;
//# sourceMappingURL=note.repository.js.map
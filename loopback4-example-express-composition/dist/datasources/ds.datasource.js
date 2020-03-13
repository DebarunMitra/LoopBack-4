"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-express-composition
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const ds_datasource_config_json_1 = tslib_1.__importDefault(require("./ds.datasource.config.json"));
let DsDataSource = class DsDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = ds_datasource_config_json_1.default) {
        super(dsConfig);
    }
};
DsDataSource.dataSourceName = 'ds';
DsDataSource = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.config.ds', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], DsDataSource);
exports.DsDataSource = DsDataSource;
//# sourceMappingURL=ds.datasource.js.map
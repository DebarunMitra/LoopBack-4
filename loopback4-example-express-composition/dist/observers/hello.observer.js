"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-express-composition
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
let HelloObserver = class HelloObserver {
    constructor() {
        this.events = [];
    }
    /*
    constructor(
      @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    ) {}
    */
    /**
     * This method will be invoked when the application starts
     */
    async start() {
        this.events.push(`${new Date()}: hello-start`);
    }
    /**
     * This method will be invoked when the application stops
     */
    async stop() {
        this.events.push(`${new Date()}: hello-stop`);
    }
};
HelloObserver = tslib_1.__decorate([
    core_1.lifeCycleObserver()
], HelloObserver);
exports.HelloObserver = HelloObserver;
//# sourceMappingURL=hello.observer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bigquery_client_1 = require("./bigquery-client");
describe('bigqueryClient', () => {
    it('should work', () => {
        expect((0, bigquery_client_1.bigqueryClient)()).toEqual('bigquery-client');
    });
});
//# sourceMappingURL=bigquery-client.spec.js.map
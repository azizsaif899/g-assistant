"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdooBigQueryPipeline = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./lib/bigquery-client"), exports);
// Missing export for API
class OdooBigQueryPipeline {
    async syncData(data) { return { synced: true, records: data.length }; }
    async extractData(query) { return { data: [], count: 0 }; }
}
exports.OdooBigQueryPipeline = OdooBigQueryPipeline;
//# sourceMappingURL=index.js.map
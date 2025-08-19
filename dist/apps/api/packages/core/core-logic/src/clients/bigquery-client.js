"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryClient = void 0;
const bigquery_1 = require("@google-cloud/bigquery");
class BigQueryClient {
    constructor(config) {
        this.projectId = config.projectId;
        this.bigquery = new bigquery_1.BigQuery({
            projectId: config.projectId,
            keyFilename: config.keyFilename,
            credentials: config.credentials,
            location: config.location || 'US'
        });
    }
    async executeQuery(query) {
        const startTime = Date.now();
        try {
            const [job] = await this.bigquery.createQueryJob({
                query,
                location: 'US',
                useLegacySql: false
            });
            const [rows] = await job.getQueryResults();
            const executionTime = Date.now() - startTime;
            return {
                rows,
                totalRows: rows.length,
                jobId: job.id,
                executionTime
            };
        }
        catch (error) {
            console.error('BigQuery Error:', error);
            throw new Error(`فشل في تنفيذ الاستعلام: ${error.message}`);
        }
    }
    async insertData(datasetId, tableId, rows) {
        try {
            await this.bigquery
                .dataset(datasetId)
                .table(tableId)
                .insert(rows);
            console.log(`تم إدراج ${rows.length} صف في ${datasetId}.${tableId}`);
        }
        catch (error) {
            console.error('BigQuery Insert Error:', error);
            throw new Error(`فشل في إدراج البيانات: ${error.message}`);
        }
    }
    async createDataset(datasetId) {
        try {
            const [dataset] = await this.bigquery.createDataset(datasetId);
            console.log(`تم إنشاء Dataset: ${dataset.id}`);
        }
        catch (error) {
            if (error.code !== 409) { // Dataset already exists
                throw error;
            }
        }
    }
    async getAnalytics(timeRange = '7d') {
        const query = `
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as events,
        COUNT(DISTINCT user_id) as unique_users
      FROM \`${this.projectId}.analytics.events\`
      WHERE timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL ${timeRange.replace('d', '')} DAY)
      GROUP BY date
      ORDER BY date DESC
    `;
        return await this.executeQuery(query);
    }
}
exports.BigQueryClient = BigQueryClient;
//# sourceMappingURL=bigquery-client.js.map
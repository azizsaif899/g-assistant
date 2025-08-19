"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractTester = void 0;
class ContractTester {
    constructor() {
        this.contracts = new Map();
    }
    defineContract(serviceName, contract) {
        this.contracts.set(serviceName, contract);
    }
    async testContract(serviceName, implementation) {
        const contract = this.contracts.get(serviceName);
        if (!contract) {
            throw new Error(`Contract not found for service: ${serviceName}`);
        }
        const results = [];
        // Test endpoints
        for (const endpoint of contract.endpoints) {
            const violations = await this.testEndpoint(endpoint, implementation);
            results.push(...violations);
        }
        // Test data schemas
        for (const schema of contract.schemas) {
            const violations = await this.testSchema(schema, implementation);
            results.push(...violations);
        }
        return {
            serviceName,
            passed: results.length === 0,
            violations: results,
            testedAt: new Date()
        };
    }
    async testServiceIntegration(consumer, provider) {
        const consumerContract = this.contracts.get(consumer);
        const providerContract = this.contracts.get(provider);
        if (!consumerContract || !providerContract) {
            throw new Error('Contracts not found for integration test');
        }
        const compatibilityIssues = this.checkCompatibility(consumerContract, providerContract);
        return {
            consumer,
            provider,
            compatible: compatibilityIssues.length === 0,
            issues: compatibilityIssues,
            testedAt: new Date()
        };
    }
    async testEndpoint(endpoint, implementation) {
        const violations = [];
        try {
            // Mock endpoint testing
            const response = await this.callEndpoint(endpoint.path, endpoint.method, endpoint.requestSchema);
            if (!this.validateResponse(response, endpoint.responseSchema)) {
                violations.push({
                    type: 'response_schema',
                    endpoint: endpoint.path,
                    expected: endpoint.responseSchema,
                    actual: response,
                    message: 'Response does not match expected schema'
                });
            }
            if (response.status !== endpoint.expectedStatus) {
                violations.push({
                    type: 'status_code',
                    endpoint: endpoint.path,
                    expected: endpoint.expectedStatus,
                    actual: response.status,
                    message: `Expected status ${endpoint.expectedStatus}, got ${response.status}`
                });
            }
        }
        catch (error) {
            violations.push({
                type: 'endpoint_error',
                endpoint: endpoint.path,
                expected: 'successful response',
                actual: error.message,
                message: `Endpoint failed: ${error.message}`
            });
        }
        return violations;
    }
    async testSchema(schema, implementation) {
        const violations = [];
        // Mock schema validation
        const sampleData = this.generateSampleData(schema);
        const isValid = this.validateDataAgainstSchema(sampleData, schema);
        if (!isValid) {
            violations.push({
                type: 'schema_validation',
                endpoint: schema.name,
                expected: schema.structure,
                actual: sampleData,
                message: 'Data does not conform to schema'
            });
        }
        return violations;
    }
    checkCompatibility(consumer, provider) {
        const issues = [];
        // Check if provider has all endpoints that consumer expects
        for (const consumerEndpoint of consumer.endpoints) {
            const providerEndpoint = provider.endpoints.find(e => e.path === consumerEndpoint.path && e.method === consumerEndpoint.method);
            if (!providerEndpoint) {
                issues.push({
                    type: 'missing_endpoint',
                    description: `Provider missing endpoint: ${consumerEndpoint.method} ${consumerEndpoint.path}`,
                    severity: 'high'
                });
            }
            else {
                // Check schema compatibility
                if (!this.schemasCompatible(consumerEndpoint.responseSchema, providerEndpoint.responseSchema)) {
                    issues.push({
                        type: 'schema_mismatch',
                        description: `Response schema mismatch for ${consumerEndpoint.path}`,
                        severity: 'medium'
                    });
                }
            }
        }
        return issues;
    }
    async callEndpoint(path, method, requestSchema) {
        // Mock API call
        return {
            status: 200,
            data: { id: 1, name: 'Test', email: 'test@example.com' }
        };
    }
    validateResponse(response, schema) {
        // Mock response validation
        return response && response.data && typeof response.data === 'object';
    }
    generateSampleData(schema) {
        // Mock sample data generation
        return { id: 1, name: 'Sample', type: schema.name };
    }
    validateDataAgainstSchema(data, schema) {
        // Mock schema validation
        return data && typeof data === 'object';
    }
    schemasCompatible(consumerSchema, providerSchema) {
        // Mock schema compatibility check
        return JSON.stringify(consumerSchema) === JSON.stringify(providerSchema);
    }
}
exports.ContractTester = ContractTester;
//# sourceMappingURL=contract-tester.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiClient = exports.AzizSysApiClient = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
class AzizSysApiClient {
    constructor(baseURL = 'http://localhost:3333/api') {
        this.token = null;
        this.client = axios_1.default.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Request interceptor to add auth token
        this.client.interceptors.request.use((config) => {
            if (this.token) {
                config.headers.Authorization = `Bearer ${this.token}`;
            }
            return config;
        });
        // Response interceptor for error handling
        this.client.interceptors.response.use((response) => response, (error) => {
            if (error.response?.status === 401) {
                this.clearToken();
            }
            return Promise.reject(error);
        });
    }
    setToken(token) {
        this.token = token;
    }
    clearToken() {
        this.token = null;
    }
    // Auth endpoints
    async login(credentials) {
        const response = await this.client.post('/auth/login', credentials);
        if (response.data.success && response.data.token) {
            this.setToken(response.data.token);
        }
        return response.data;
    }
    async logout() {
        const response = await this.client.post('/auth/logout');
        this.clearToken();
        return response.data;
    }
    async validateToken(token) {
        const response = await this.client.post('/auth/validate', { token });
        return response.data;
    }
    // Query endpoints
    async query(request) {
        const response = await this.client.post('/query', request);
        return response.data;
    }
    async analyzeData(data) {
        const response = await this.client.post('/query/analyze', data);
        return response.data;
    }
    // Health endpoint
    async getHealth() {
        const response = await this.client.get('/health');
        return response.data;
    }
}
exports.AzizSysApiClient = AzizSysApiClient;
// Export singleton instance
exports.apiClient = new AzizSysApiClient();
// Export types
tslib_1.__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map
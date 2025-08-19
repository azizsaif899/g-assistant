"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ConfigManager = class ConfigManager {
    constructor() {
        this.config = {
            monitoring: {
                enabled: true,
                healthCheckInterval: 30000,
                alertThresholds: {
                    criticalTasks: 1,
                    errorRateMax: 10,
                    memoryUsageMax: 85
                }
            },
            telemetry: {
                enabled: true,
                retentionDays: 7,
                maxLogEntries: 100
            },
            errorHandling: {
                autoRetry: true,
                maxRetries: 3,
                retryDelay: 5000
            },
            performance: {
                maxConcurrentTasks: 5,
                taskTimeout: 300000,
                cpuThreshold: 80
            },
            features: {
                advancedAI: true,
                researchAgent: true,
                multiAgent: true,
                realTimeChat: true
            }
        };
    }
    getConfig(key) {
        if (key) {
            return this.getNestedValue(this.config, key);
        }
        return this.config;
    }
    setConfig(key, value) {
        this.setNestedValue(this.config, key, value);
    }
    isFeatureEnabled(feature) {
        return this.config.features[feature] || false;
    }
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key])
                current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = value;
    }
};
exports.ConfigManager = ConfigManager;
exports.ConfigManager = ConfigManager = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ConfigManager);
//# sourceMappingURL=config-manager.js.map
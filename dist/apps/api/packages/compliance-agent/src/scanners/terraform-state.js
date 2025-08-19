"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerraformState = void 0;
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
/**
 * ماسح حالة Terraform
 * Terraform state scanner
 */
class TerraformState {
    constructor(tfStatePath) {
        this.tfStatePath = tfStatePath;
    }
    /**
     * تحميل الموارد من ملف حالة Terraform
     * Load resources from Terraform state file
     */
    loadResources() {
        try {
            if (!node_fs_1.default.existsSync(this.tfStatePath)) {
                console.warn(`Terraform state file not found: ${this.tfStatePath}`);
                return this.getMockResources();
            }
            const stateContent = node_fs_1.default.readFileSync(this.tfStatePath, 'utf8');
            const state = JSON.parse(stateContent);
            const resources = state?.resources ?? [];
            console.log(`Loaded ${resources.length} resources from Terraform state`);
            return resources;
        }
        catch (error) {
            console.error('Error loading Terraform state:', error);
            return this.getMockResources();
        }
    }
    /**
     * الحصول على موارد وهمية للاختبار
     * Get mock resources for testing
     */
    getMockResources() {
        const mockResources = [
            {
                type: 'google_cloud_run_service',
                name: 'api-service',
                provider: 'provider[\"registry.terraform.io/hashicorp/google\"]',
                instances: [{
                        attributes: {
                            name: 'api-service',
                            location: 'me-central1',
                            project: 'g-assistant-project'
                        }
                    }]
            },
            {
                type: 'google_storage_bucket',
                name: 'app-storage',
                provider: 'provider[\"registry.terraform.io/hashicorp/google\"]',
                instances: [{
                        attributes: {
                            name: 'app-storage-bucket',
                            location: 'me-central1',
                            project: 'g-assistant-project'
                        }
                    }]
            },
            {
                type: 'google_bigquery_dataset',
                name: 'analytics',
                provider: 'provider[\"registry.terraform.io/hashicorp/google\"]',
                instances: [{
                        attributes: {
                            dataset_id: 'analytics_dataset',
                            location: 'me-central1',
                            project: 'g-assistant-project'
                        }
                    }]
            }
        ];
        console.log(`Using ${mockResources.length} mock Terraform resources`);
        return mockResources;
    }
    /**
     * الحصول على قائمة أنواع الموارد
     * Get list of resource types
     */
    getResourceTypes() {
        const resources = this.loadResources();
        const types = [...new Set(resources.map(r => r.type))];
        console.log(`Found resource types: ${types.join(', ')}`);
        return types;
    }
    /**
     * الحصول على الموارد حسب النوع
     * Get resources by type
     */
    getResourcesByType(type) {
        const resources = this.loadResources();
        const filtered = resources.filter(r => r.type === type);
        console.log(`Found ${filtered.length} resources of type: ${type}`);
        return filtered;
    }
    /**
     * التحقق من وجود مورد محدد
     * Check if a specific resource exists
     */
    hasResource(type, name) {
        const resources = this.loadResources();
        const exists = resources.some(r => r.type === type && r.name === name);
        console.log(`Resource ${type}.${name} exists: ${exists}`);
        return exists;
    }
    /**
     * الحصول على إحصائيات الموارد
     * Get resource statistics
     */
    getResourceStats() {
        const resources = this.loadResources();
        const resourcesByType = {};
        const resourcesByProvider = {};
        resources.forEach(resource => {
            // Count by type
            resourcesByType[resource.type] = (resourcesByType[resource.type] || 0) + 1;
            // Count by provider
            const provider = resource.provider || 'unknown';
            resourcesByProvider[provider] = (resourcesByProvider[provider] || 0) + 1;
        });
        return {
            totalResources: resources.length,
            resourcesByType,
            resourcesByProvider
        };
    }
}
exports.TerraformState = TerraformState;
//# sourceMappingURL=terraform-state.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigCore = void 0;
class ConfigCore {
    constructor() {
        this.config = new Map();
        this.initializeDefaults();
    }
    initializeDefaults() {
        this.config.set('system.language', 'ar');
        this.config.set('system.theme', 'light');
        this.config.set('ai.defaultModel', 'gemini-pro');
        this.config.set('ai.temperature', 0.7);
        this.config.set('database.connectionPool', 20);
        this.config.set('cache.ttl', 3600);
    }
    get(key) {
        return this.config.get(key);
    }
    set(key, value) {
        this.config.set(key, value);
        console.log(`⚙️ Config updated: ${key} = ${value}`);
    }
    getAll() {
        return Object.fromEntries(this.config);
    }
    reset() {
        this.config.clear();
        this.initializeDefaults();
        console.log('🔄 Config reset to defaults');
    }
    export() {
        return JSON.stringify(Object.fromEntries(this.config), null, 2);
    }
    import(configJson) {
        const imported = JSON.parse(configJson);
        for (const [key, value] of Object.entries(imported)) {
            this.config.set(key, value);
        }
        console.log('📥 Config imported successfully');
    }
}
exports.ConfigCore = ConfigCore;
//# sourceMappingURL=index.js.map
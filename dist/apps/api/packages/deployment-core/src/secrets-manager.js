"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretsManager = void 0;
class SecretsManager {
    constructor() {
        this.secrets = new Map();
        this.encryptionKey = 'mock-encryption-key';
    }
    async storeSecret(name, value, metadata) {
        const encrypted = this.encrypt(value);
        const secret = {
            name,
            encryptedValue: encrypted,
            metadata: {
                ...metadata,
                createdAt: new Date(),
                lastRotated: new Date()
            }
        };
        this.secrets.set(name, secret);
    }
    async getSecret(name) {
        const secret = this.secrets.get(name);
        if (!secret)
            return null;
        return this.decrypt(secret.encryptedValue);
    }
    async rotateSecret(name, newValue) {
        const existing = this.secrets.get(name);
        if (!existing) {
            throw new Error(`Secret ${name} not found`);
        }
        const encrypted = this.encrypt(newValue);
        existing.encryptedValue = encrypted;
        existing.metadata.lastRotated = new Date();
        existing.metadata.version = (existing.metadata.version || 1) + 1;
        this.secrets.set(name, existing);
    }
    async deleteSecret(name) {
        this.secrets.delete(name);
    }
    async listSecrets() {
        return Array.from(this.secrets.values()).map(secret => ({
            name: secret.name,
            createdAt: secret.metadata.createdAt,
            lastRotated: secret.metadata.lastRotated,
            version: secret.metadata.version || 1
        }));
    }
    async autoRotateSecrets() {
        const results = [];
        const now = new Date();
        for (const [name, secret] of this.secrets) {
            const daysSinceRotation = Math.floor((now.getTime() - secret.metadata.lastRotated.getTime()) / (1000 * 60 * 60 * 24));
            if (daysSinceRotation >= 30) { // Rotate every 30 days
                try {
                    const newValue = this.generateSecretValue();
                    await this.rotateSecret(name, newValue);
                    results.push({
                        secretName: name,
                        success: true,
                        message: 'Secret rotated successfully'
                    });
                }
                catch (error) {
                    results.push({
                        secretName: name,
                        success: false,
                        message: error.message
                    });
                }
            }
        }
        return results;
    }
    encrypt(value) {
        // Mock encryption - في التطبيق الحقيقي سيتم استخدام تشفير قوي
        return Buffer.from(value).toString('base64');
    }
    decrypt(encryptedValue) {
        // Mock decryption
        return Buffer.from(encryptedValue, 'base64').toString('utf8');
    }
    generateSecretValue() {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }
}
exports.SecretsManager = SecretsManager;
//# sourceMappingURL=secrets-manager.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialManager = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const crypto = tslib_1.__importStar(require("crypto"));
let CredentialManager = class CredentialManager {
    constructor() {
        this.algorithm = 'aes-256-gcm';
        this.keyLength = 32;
    }
    async encryptCredential(credential, masterKey) {
        const iv = crypto.randomBytes(16);
        const key = crypto.scryptSync(masterKey, 'salt', this.keyLength);
        const cipher = crypto.createCipher(this.algorithm, key);
        let encrypted = cipher.update(credential, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }
    async decryptCredential(encryptedCredential, masterKey) {
        const [ivHex, encrypted] = encryptedCredential.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const key = crypto.scryptSync(masterKey, 'salt', this.keyLength);
        const decipher = crypto.createDecipher(this.algorithm, key);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    async getSecureCredential(key) {
        const encryptedValue = process.env[`ENCRYPTED_${key}`];
        const masterKey = process.env.MASTER_KEY;
        if (!encryptedValue || !masterKey) {
            throw new Error(`Secure credential ${key} not found`);
        }
        return this.decryptCredential(encryptedValue, masterKey);
    }
};
exports.CredentialManager = CredentialManager;
exports.CredentialManager = CredentialManager = tslib_1.__decorate([
    (0, common_1.Injectable)()
], CredentialManager);
//# sourceMappingURL=credential-manager.js.map
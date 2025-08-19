"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityManager = void 0;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto"));
class SecurityManager {
    constructor(config) {
        this.events = [];
        this.config = {
            encryption: {
                algorithm: 'aes-256-gcm',
                keyLength: 32,
                ivLength: 16
            },
            hashing: {
                algorithm: 'sha256',
                saltRounds: 12
            },
            jwt: {
                secret: process.env.JWT_SECRET || 'default-secret',
                expiresIn: '1h',
                algorithm: 'HS256'
            },
            ...config
        };
    }
    // Encryption methods
    encrypt(data, key) {
        const encryptionKey = key ? Buffer.from(key, 'hex') : crypto.randomBytes(this.config.encryption.keyLength);
        const iv = crypto.randomBytes(this.config.encryption.ivLength);
        const cipher = crypto.createCipher(this.config.encryption.algorithm, encryptionKey);
        cipher.setAAD(Buffer.from('additional-data'));
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const tag = cipher.getAuthTag();
        this.logSecurityEvent({
            type: 'encryption',
            severity: 'low',
            message: 'Data encrypted successfully',
            timestamp: new Date()
        });
        return {
            encrypted,
            iv: iv.toString('hex'),
            tag: tag.toString('hex')
        };
    }
    decrypt(encryptedData, key, iv, tag) {
        try {
            const encryptionKey = Buffer.from(key, 'hex');
            const ivBuffer = Buffer.from(iv, 'hex');
            const tagBuffer = Buffer.from(tag, 'hex');
            const decipher = crypto.createDecipher(this.config.encryption.algorithm, encryptionKey);
            decipher.setAAD(Buffer.from('additional-data'));
            decipher.setAuthTag(tagBuffer);
            let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
        catch (error) {
            this.logSecurityEvent({
                type: 'encryption',
                severity: 'high',
                message: 'Decryption failed',
                timestamp: new Date(),
                metadata: { error: error.message }
            });
            throw new Error('Decryption failed');
        }
    }
    // Hashing methods
    hash(data, salt) {
        const saltToUse = salt || crypto.randomBytes(16).toString('hex');
        const hash = crypto.createHash(this.config.hashing.algorithm);
        hash.update(data + saltToUse);
        return hash.digest('hex') + ':' + saltToUse;
    }
    verifyHash(data, hashedData) {
        const [hash, salt] = hashedData.split(':');
        const newHash = crypto.createHash(this.config.hashing.algorithm);
        newHash.update(data + salt);
        return newHash.digest('hex') === hash;
    }
    // Token methods
    generateToken(payload) {
        try {
            // Simplified token generation (in production use proper JWT library)
            const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
            const payloadStr = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 3600000 })).toString('base64');
            const signature = crypto.createHmac('sha256', this.config.jwt.secret).update(`${header}.${payloadStr}`).digest('base64');
            return `${header}.${payloadStr}.${signature}`;
        }
        catch (error) {
            this.logSecurityEvent({
                type: 'authentication',
                severity: 'medium',
                message: 'Token generation failed',
                timestamp: new Date()
            });
            throw error;
        }
    }
    verifyToken(token) {
        try {
            const [header, payload, signature] = token.split('.');
            const expectedSignature = crypto.createHmac('sha256', this.config.jwt.secret).update(`${header}.${payload}`).digest('base64');
            if (signature !== expectedSignature) {
                this.logSecurityEvent({
                    type: 'authentication',
                    severity: 'high',
                    message: 'Invalid token signature',
                    timestamp: new Date()
                });
                return null;
            }
            const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
            if (decodedPayload.exp < Date.now()) {
                this.logSecurityEvent({
                    type: 'authentication',
                    severity: 'medium',
                    message: 'Token expired',
                    timestamp: new Date()
                });
                return null;
            }
            return decodedPayload;
        }
        catch (error) {
            this.logSecurityEvent({
                type: 'authentication',
                severity: 'high',
                message: 'Token verification failed',
                timestamp: new Date()
            });
            return null;
        }
    }
    // Security event logging
    logSecurityEvent(event) {
        this.events.push(event);
        // Keep only last 1000 events
        if (this.events.length > 1000) {
            this.events.shift();
        }
        // Log critical events immediately
        if (event.severity === 'critical') {
            console.error('🚨 CRITICAL SECURITY EVENT:', event);
        }
    }
    getSecurityEvents(severity) {
        if (severity) {
            return this.events.filter(event => event.severity === severity);
        }
        return this.events;
    }
    // Generate secure random values
    generateSecureRandom(length) {
        return crypto.randomBytes(length).toString('hex');
    }
    // Input sanitization
    sanitizeInput(input) {
        return input
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .replace(/['"]/g, '') // Remove quotes
            .replace(/[;&|`$]/g, '') // Remove command injection chars
            .trim();
    }
}
exports.SecurityManager = SecurityManager;
//# sourceMappingURL=security-manager.js.map
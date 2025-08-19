"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto"));
class EncryptionService {
    constructor(config) {
        this.config = {
            algorithm: 'aes-256-gcm',
            keyLength: 32,
            ivLength: 16,
            tagLength: 16,
            ...config
        };
        this.masterKey = this.deriveMasterKey();
    }
    deriveMasterKey() {
        const password = process.env.MASTER_KEY || 'default-master-key';
        const salt = process.env.MASTER_SALT || 'default-salt';
        return crypto.pbkdf2Sync(password, salt, 100000, this.config.keyLength, 'sha256');
    }
    // Symmetric encryption
    encrypt(data, key) {
        const encryptionKey = key || this.masterKey;
        const iv = crypto.randomBytes(this.config.ivLength);
        const cipher = crypto.createCipher(this.config.algorithm, encryptionKey);
        cipher.setAAD(Buffer.from('azizsys-auth-data'));
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const tag = cipher.getAuthTag();
        return {
            data: encrypted,
            iv: iv.toString('hex'),
            tag: tag.toString('hex'),
            algorithm: this.config.algorithm
        };
    }
    decrypt(encryptedData, key) {
        const decryptionKey = key || this.masterKey;
        const iv = Buffer.from(encryptedData.iv, 'hex');
        const tag = Buffer.from(encryptedData.tag, 'hex');
        const decipher = crypto.createDecipher(encryptedData.algorithm, decryptionKey);
        decipher.setAAD(Buffer.from('azizsys-auth-data'));
        decipher.setAuthTag(tag);
        let decrypted = decipher.update(encryptedData.data, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    // File encryption
    encryptFile(filePath, outputPath, key) {
        const encryptionKey = key || this.masterKey;
        const iv = crypto.randomBytes(this.config.ivLength);
        const cipher = crypto.createCipher(this.config.algorithm, encryptionKey);
        const fs = require('fs');
        const input = fs.createReadStream(filePath);
        const output = fs.createWriteStream(outputPath);
        // Write IV to the beginning of the file
        output.write(iv);
        input.pipe(cipher).pipe(output);
    }
    decryptFile(encryptedFilePath, outputPath, key) {
        const decryptionKey = key || this.masterKey;
        const fs = require('fs');
        const input = fs.createReadStream(encryptedFilePath);
        const output = fs.createWriteStream(outputPath);
        // Read IV from the beginning of the file
        const iv = Buffer.alloc(this.config.ivLength);
        input.read(iv);
        const decipher = crypto.createDecipher(this.config.algorithm, decryptionKey);
        input.pipe(decipher).pipe(output);
    }
    // Asymmetric encryption (RSA)
    generateKeyPair(keySize = 2048) {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: keySize,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
        return { publicKey, privateKey };
    }
    encryptWithPublicKey(data, publicKey) {
        const buffer = Buffer.from(data, 'utf8');
        const encrypted = crypto.publicEncrypt(publicKey, buffer);
        return encrypted.toString('base64');
    }
    decryptWithPrivateKey(encryptedData, privateKey) {
        const buffer = Buffer.from(encryptedData, 'base64');
        const decrypted = crypto.privateDecrypt(privateKey, buffer);
        return decrypted.toString('utf8');
    }
    // Digital signatures
    sign(data, privateKey) {
        const sign = crypto.createSign('SHA256');
        sign.update(data);
        sign.end();
        const signature = sign.sign(privateKey);
        return signature.toString('base64');
    }
    verify(data, signature, publicKey) {
        const verify = crypto.createVerify('SHA256');
        verify.update(data);
        verify.end();
        return verify.verify(publicKey, signature, 'base64');
    }
    // Key derivation
    deriveKey(password, salt, iterations = 100000) {
        return crypto.pbkdf2Sync(password, salt, iterations, this.config.keyLength, 'sha256');
    }
    // Secure random generation
    generateSecureRandom(length) {
        return crypto.randomBytes(length).toString('hex');
    }
    generateSalt(length = 16) {
        return crypto.randomBytes(length).toString('hex');
    }
    // Hash functions
    hash(data, algorithm = 'sha256') {
        return crypto.createHash(algorithm).update(data).digest('hex');
    }
    hmac(data, key, algorithm = 'sha256') {
        return crypto.createHmac(algorithm, key).update(data).digest('hex');
    }
    // Key rotation
    rotateKey() {
        this.masterKey = this.deriveMasterKey();
        return this.masterKey;
    }
    // Secure comparison
    secureCompare(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
    }
    // Database field encryption
    encryptField(value, fieldName) {
        const fieldKey = this.deriveKey(this.masterKey.toString('hex'), fieldName);
        return this.encrypt(value, fieldKey);
    }
    decryptField(encryptedData, fieldName) {
        const fieldKey = this.deriveKey(this.masterKey.toString('hex'), fieldName);
        return this.decrypt(encryptedData, fieldKey);
    }
}
exports.EncryptionService = EncryptionService;
//# sourceMappingURL=encryption-service.js.map
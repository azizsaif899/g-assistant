"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoBackupService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AutoBackupService = class AutoBackupService {
    async scheduleBackup() {
        setInterval(async () => {
            await this.performBackup();
        }, 24 * 60 * 60 * 1000); // Daily backup
    }
    async performBackup() {
        await this.backupDatabase();
        await this.backupFiles();
        await this.backupConfigs();
    }
    async backupDatabase() {
        // Database backup logic
    }
    async backupFiles() {
        // Files backup logic
    }
    async backupConfigs() {
        // Configuration backup logic
    }
};
exports.AutoBackupService = AutoBackupService;
exports.AutoBackupService = AutoBackupService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AutoBackupService);
//# sourceMappingURL=auto-backup.js.map
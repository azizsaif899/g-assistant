"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupManager = void 0;
class BackupManager {
    constructor() {
        this.configs = new Map();
        this.backups = [];
        this.schedules = new Map();
    }
    addBackupConfig(config) {
        this.configs.set(config.name, config);
        this.scheduleBackup(config);
    }
    scheduleBackup(config) {
        // Simple interval-based scheduling (in production, use proper cron)
        const interval = this.parseCronToInterval(config.schedule);
        const timeoutId = setInterval(() => {
            this.executeBackup(config.name);
        }, interval);
        this.schedules.set(config.name, timeoutId);
    }
    parseCronToInterval(cron) {
        // Simplified cron parsing - in production use proper cron library
        if (cron.includes('daily') || cron.includes('0 0 *')) {
            return 24 * 60 * 60 * 1000; // 24 hours
        }
        if (cron.includes('hourly') || cron.includes('0 *')) {
            return 60 * 60 * 1000; // 1 hour
        }
        return 60 * 60 * 1000; // Default 1 hour
    }
    async executeBackup(configName) {
        const config = this.configs.get(configName);
        if (!config) {
            throw new Error(`Backup config ${configName} not found`);
        }
        const backup = {
            id: `backup_${Date.now()}`,
            config: configName,
            status: 'running',
            startTime: new Date()
        };
        this.backups.push(backup);
        try {
            // Simulate backup process
            await this.performBackup(config);
            backup.status = 'completed';
            backup.endTime = new Date();
            backup.size = Math.floor(Math.random() * 1000000); // Random size in bytes
            // Clean old backups
            this.cleanOldBackups(config);
        }
        catch (error) {
            backup.status = 'failed';
            backup.endTime = new Date();
            backup.error = error.message;
        }
        return backup;
    }
    async performBackup(config) {
        // Simulate backup operation
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) { // 90% success rate
                    resolve();
                }
                else {
                    reject(new Error('Backup failed: Disk space insufficient'));
                }
            }, 2000);
        });
    }
    cleanOldBackups(config) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - config.retention);
        this.backups = this.backups.filter(backup => backup.config !== config.name || backup.startTime >= cutoffDate);
    }
    getBackupHistory(configName, limit = 50) {
        let filtered = this.backups;
        if (configName) {
            filtered = filtered.filter(b => b.config === configName);
        }
        return filtered
            .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
            .slice(0, limit);
    }
    getBackupConfigs() {
        return Array.from(this.configs.values());
    }
    removeBackupConfig(name) {
        const timeout = this.schedules.get(name);
        if (timeout) {
            clearInterval(timeout);
            this.schedules.delete(name);
        }
        return this.configs.delete(name);
    }
    getBackupStats() {
        const recentBackups = this.backups.filter(b => b.startTime >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
        const successful = recentBackups.filter(b => b.status === 'completed');
        const successRate = recentBackups.length > 0 ? (successful.length / recentBackups.length) * 100 : 0;
        const lastBackup = this.backups.length > 0
            ? this.backups.sort((a, b) => b.startTime.getTime() - a.startTime.getTime())[0].startTime
            : undefined;
        const totalSize = successful.reduce((sum, b) => sum + (b.size || 0), 0);
        return {
            totalConfigs: this.configs.size,
            successRate,
            lastBackup,
            totalSize
        };
    }
}
exports.BackupManager = BackupManager;
//# sourceMappingURL=backup-manager.js.map
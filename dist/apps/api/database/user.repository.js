"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(user_entity_1.UserEntity, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = this.create({
            ...userData,
            password: hashedPassword,
            preferences: {
                language: 'ar',
                theme: 'light',
                defaultAgent: 'general',
                defaultMode: 'smart'
            }
        });
        return await this.save(user);
    }
    async findByUsername(username) {
        return await this.findOne({ where: { username } });
    }
    async findByEmail(email) {
        return await this.findOne({ where: { email } });
    }
    async validatePassword(user, password) {
        return await bcrypt.compare(password, user.password);
    }
    async updateLastLogin(userId, ip) {
        await this.update(userId, {
            lastLoginAt: new Date(),
            lastLoginIp: ip
        });
    }
    async updatePreferences(userId, preferences) {
        const user = await this.findOne({ where: { id: userId } });
        if (user) {
            user.preferences = { ...user.preferences, ...preferences };
            await this.save(user);
        }
    }
    async getActiveUsers() {
        return await this.find({ where: { isActive: true } });
    }
    async getUserStats() {
        const total = await this.count();
        const active = await this.count({ where: { isActive: true } });
        const recentLogins = await this.count({
            where: {
                lastLoginAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
            }
        });
        return { total, active, recentLogins };
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
//# sourceMappingURL=user.repository.js.map
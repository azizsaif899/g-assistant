"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [
            {
                id: 1,
                username: 'admin',
                role: 'admin',
                email: 'admin@azizsys.com',
                createdAt: '2025-01-01T00:00:00.000Z',
                lastLogin: new Date().toISOString()
            },
            {
                id: 2,
                username: 'user',
                role: 'user',
                email: 'user@azizsys.com',
                createdAt: '2025-01-02T00:00:00.000Z',
                lastLogin: '2025-01-08T10:30:00.000Z'
            }
        ];
    }
    findAll() {
        return this.users;
    }
    findOne(id) {
        return this.users.find(user => user.id === id);
    }
    findByUsername(username) {
        return this.users.find(user => user.username === username);
    }
    create(userData) {
        const newUser = {
            id: Math.max(...this.users.map(u => u.id)) + 1,
            username: userData.username,
            role: userData.role || 'user',
            email: userData.email,
            createdAt: new Date().toISOString(),
        };
        this.users.push(newUser);
        return newUser;
    }
    update(id, userData) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1)
            return null;
        this.users[userIndex] = { ...this.users[userIndex], ...userData };
        return this.users[userIndex];
    }
    remove(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1)
            return false;
        this.users.splice(userIndex, 1);
        return true;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map
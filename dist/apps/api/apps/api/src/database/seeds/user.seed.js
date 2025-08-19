"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const tslib_1 = require("tslib");
const user_entity_1 = require("../user.entity");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
class UserSeeder {
    async run(dataSource) {
        const userRepository = dataSource.getRepository(user_entity_1.UserEntity);
        const adminUser = userRepository.create({
            username: 'admin',
            email: 'admin@azizsys.com',
            password: await bcrypt.hash('azizsys2025', 10),
            role: 'admin',
            preferences: {
                language: 'ar',
                theme: 'dark',
                defaultAgent: 'general',
                defaultMode: 'smart'
            }
        });
        const testUser = userRepository.create({
            username: 'testuser',
            email: 'test@azizsys.com',
            password: await bcrypt.hash('test123', 10),
            role: 'user',
            preferences: {
                language: 'ar',
                theme: 'light',
                defaultAgent: 'general',
                defaultMode: 'smart'
            }
        });
        await userRepository.save([adminUser, testUser]);
        console.log('✅ User seeds created');
    }
}
exports.UserSeeder = UserSeeder;
//# sourceMappingURL=user.seed.js.map
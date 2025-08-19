"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const conversation_entity_1 = require("./conversation.entity");
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 'user' }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], UserEntity.prototype, "preferences", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], UserEntity.prototype, "profile", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserEntity.prototype, "lastLoginAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "lastLoginIp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => conversation_entity_1.ConversationEntity, conversation => conversation.user),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "conversations", void 0);
exports.UserEntity = UserEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('users')
], UserEntity);
//# sourceMappingURL=user.entity.js.map
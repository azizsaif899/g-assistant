"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let SessionEntity = class SessionEntity {
};
exports.SessionEntity = SessionEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], SessionEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], SessionEntity.prototype, "token", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('uuid'),
    tslib_1.__metadata("design:type", String)
], SessionEntity.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], SessionEntity.prototype, "expiresAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], SessionEntity.prototype, "ipAddress", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], SessionEntity.prototype, "userAgent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], SessionEntity.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], SessionEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    tslib_1.__metadata("design:type", user_entity_1.UserEntity)
], SessionEntity.prototype, "user", void 0);
exports.SessionEntity = SessionEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('sessions')
], SessionEntity);
//# sourceMappingURL=session.entity.js.map
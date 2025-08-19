"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = exports.Deprecated = exports.DEPRECATED_KEY = exports.ApiVersion = exports.API_VERSION_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.API_VERSION_KEY = 'apiVersion';
const ApiVersion = (version) => (0, common_1.SetMetadata)(exports.API_VERSION_KEY, version);
exports.ApiVersion = ApiVersion;
exports.DEPRECATED_KEY = 'deprecated';
const Deprecated = (deprecationDate, alternativeEndpoint) => (0, common_1.SetMetadata)(exports.DEPRECATED_KEY, { deprecationDate, alternativeEndpoint });
exports.Deprecated = Deprecated;
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=api-version.decorator.js.map
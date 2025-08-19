"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    displayName: 'whatsapp-core',
    preset: '../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../coverage/whatsapp-core',
};
//# sourceMappingURL=jest.config.js.map
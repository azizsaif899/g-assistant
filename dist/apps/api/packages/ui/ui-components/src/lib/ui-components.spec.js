"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("@testing-library/react");
const ui_components_1 = tslib_1.__importDefault(require("./ui-components"));
describe('UiComponents', () => {
    it('should render successfully', () => {
        const { baseElement } = (0, react_1.render)(<ui_components_1.default />);
        expect(baseElement).toBeTruthy();
    });
});
//# sourceMappingURL=ui-components.spec.js.map
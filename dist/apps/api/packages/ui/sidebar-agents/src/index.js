"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarSystem = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./agents/CFOAgent"), exports);
tslib_1.__exportStar(require("./agents/DeveloperAgent"), exports);
tslib_1.__exportStar(require("./agents/DatabaseManagerAgent"), exports);
tslib_1.__exportStar(require("./agents/OperationsAgent"), exports);
tslib_1.__exportStar(require("./agents/GeneralAgent"), exports);
tslib_1.__exportStar(require("./modes/SmartMode"), exports);
tslib_1.__exportStar(require("./modes/IterativeMode"), exports);
tslib_1.__exportStar(require("./modes/AnalysisMode"), exports);
const CFOAgent_1 = require("./agents/CFOAgent");
const DeveloperAgent_1 = require("./agents/DeveloperAgent");
const DatabaseManagerAgent_1 = require("./agents/DatabaseManagerAgent");
const OperationsAgent_1 = require("./agents/OperationsAgent");
const GeneralAgent_1 = require("./agents/GeneralAgent");
const SmartMode_1 = require("./modes/SmartMode");
const IterativeMode_1 = require("./modes/IterativeMode");
const AnalysisMode_1 = require("./modes/AnalysisMode");
class SidebarSystem {
    constructor() {
        this.agents = {
            cfo: new CFOAgent_1.CFOAgent(),
            developer: new DeveloperAgent_1.DeveloperAgent(),
            database: new DatabaseManagerAgent_1.DatabaseManagerAgent(),
            operations: new OperationsAgent_1.OperationsAgent(),
            general: new GeneralAgent_1.GeneralAgent()
        };
        this.modes = {
            smart: new SmartMode_1.SmartMode(),
            iterative: new IterativeMode_1.IterativeMode(),
            analysis: new AnalysisMode_1.AnalysisMode()
        };
    }
    async processQuery(agentType, mode, query) {
        const agent = this.agents[agentType];
        const processingMode = this.modes[mode];
        if (!agent || !processingMode) {
            throw new Error('Agent or mode not found');
        }
        return await processingMode.process(query, agent);
    }
    getAgents() {
        return Object.keys(this.agents);
    }
    getModes() {
        return Object.keys(this.modes);
    }
    getStatus() {
        return {
            agents: Object.keys(this.agents).length,
            modes: Object.keys(this.modes).length,
            active: true
        };
    }
}
exports.SidebarSystem = SidebarSystem;
//# sourceMappingURL=index.js.map
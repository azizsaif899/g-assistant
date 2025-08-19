"use strict";
/**
 * نقطة الدخول الرئيسية لوكيل الرقيب
 * Main entry point for Al-Raqib Compliance Agent
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditDataResidency = exports.auditIacUsage = exports.writeMarkdown = exports.TerraformState = exports.GitHubScanner = exports.GoogleCloudScanner = exports.KnowledgeBase = exports.ComplianceAuditorAgent = void 0;
const tslib_1 = require("tslib");
var compliance_agent_1 = require("./agents/compliance.agent");
Object.defineProperty(exports, "ComplianceAuditorAgent", { enumerable: true, get: function () { return compliance_agent_1.ComplianceAuditorAgent; } });
var knowledge_base_1 = require("./knowledge/knowledge-base");
Object.defineProperty(exports, "KnowledgeBase", { enumerable: true, get: function () { return knowledge_base_1.KnowledgeBase; } });
var gcp_scanner_1 = require("./scanners/gcp-scanner");
Object.defineProperty(exports, "GoogleCloudScanner", { enumerable: true, get: function () { return gcp_scanner_1.GoogleCloudScanner; } });
var github_scanner_1 = require("./scanners/github-scanner");
Object.defineProperty(exports, "GitHubScanner", { enumerable: true, get: function () { return github_scanner_1.GitHubScanner; } });
var terraform_state_1 = require("./scanners/terraform-state");
Object.defineProperty(exports, "TerraformState", { enumerable: true, get: function () { return terraform_state_1.TerraformState; } });
var markdown_reporter_1 = require("./reporters/markdown.reporter");
Object.defineProperty(exports, "writeMarkdown", { enumerable: true, get: function () { return markdown_reporter_1.writeMarkdown; } });
var audit_iac_usage_1 = require("./audits/audit.iac-usage");
Object.defineProperty(exports, "auditIacUsage", { enumerable: true, get: function () { return audit_iac_usage_1.auditIacUsage; } });
var audit_data_residency_1 = require("./audits/audit.data-residency");
Object.defineProperty(exports, "auditDataResidency", { enumerable: true, get: function () { return audit_data_residency_1.auditDataResidency; } });
tslib_1.__exportStar(require("./types/audit"), exports);
// تشغيل مباشر إذا تم استدعاء الملف
if (require.main === module) {
    console.log('🛡️ Al-Raqib Compliance Agent');
    console.log('Use: import { ComplianceAuditorAgent } from "@g-assistant/compliance-agent"');
}
//# sourceMappingURL=index.js.map
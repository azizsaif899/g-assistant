"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentStatus = exports.ContentType = void 0;
var ContentType;
(function (ContentType) {
    ContentType["ARTICLE"] = "article";
    ContentType["KNOWLEDGE_BASE"] = "knowledge_base";
    ContentType["FAQ"] = "faq";
    ContentType["TUTORIAL"] = "tutorial";
    ContentType["DOCUMENTATION"] = "documentation";
    ContentType["MEDIA"] = "media";
})(ContentType || (exports.ContentType = ContentType = {}));
var ContentStatus;
(function (ContentStatus) {
    ContentStatus["DRAFT"] = "draft";
    ContentStatus["REVIEW"] = "review";
    ContentStatus["APPROVED"] = "approved";
    ContentStatus["PUBLISHED"] = "published";
    ContentStatus["ARCHIVED"] = "archived";
})(ContentStatus || (exports.ContentStatus = ContentStatus = {}));
//# sourceMappingURL=types.js.map
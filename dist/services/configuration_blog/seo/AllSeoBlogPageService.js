"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllSeoBlogPageService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class AllSeoBlogPageService {
    async execute() {
        const seoPage = await prisma_1.default.sEOSettings.findMany();
        return seoPage;
    }
}
exports.AllSeoBlogPageService = AllSeoBlogPageService;
//# sourceMappingURL=AllSeoBlogPageService.js.map
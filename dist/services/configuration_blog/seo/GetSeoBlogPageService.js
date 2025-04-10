"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSeoBlogPageService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class GetSeoBlogPageService {
    async execute({ page }) {
        const seoPage = await prisma_1.default.sEOSettings.findFirst({
            where: {
                page: page
            }
        });
        return seoPage;
    }
}
exports.GetSeoBlogPageService = GetSeoBlogPageService;
//# sourceMappingURL=GetSeoBlogPageService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSeoUniqueService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class GetSeoUniqueService {
    async execute({ sEOSettings_id }) {
        const seoPage = await prisma_1.default.sEOSettings.findFirst({
            where: {
                id: sEOSettings_id
            }
        });
        return seoPage;
    }
}
exports.GetSeoUniqueService = GetSeoUniqueService;
//# sourceMappingURL=GetSeoUniqueService.js.map
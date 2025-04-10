"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitemapCategoryService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class SitemapCategoryService {
    async execute() {
        const data_category = await prisma_1.default.category.findMany({
            where: {
                status: client_1.StatusCategory.Disponivel
            }
        });
        return data_category;
    }
}
exports.SitemapCategoryService = SitemapCategoryService;
//# sourceMappingURL=SitemapCategoryService.js.map
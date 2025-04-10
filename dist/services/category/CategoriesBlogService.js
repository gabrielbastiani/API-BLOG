"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesBlogService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
class CategoriesBlogService {
    async execute() {
        const all_categories = await prisma_1.default.category.findMany({
            where: { status: client_1.StatusCategory.Disponivel },
            orderBy: { created_at: "desc" },
            include: {
                children: {
                    where: { status: client_1.StatusCategory.Disponivel },
                    select: {
                        id: true,
                        slug_name_category: true,
                        name_category: true
                    }
                }
            }
        });
        return all_categories;
    }
}
exports.CategoriesBlogService = CategoriesBlogService;
//# sourceMappingURL=CategoriesBlogService.js.map
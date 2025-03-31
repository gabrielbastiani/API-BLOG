"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveCategoryDownService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class MoveCategoryDownService {
    async moveCategoryDown(categoryId) {
        const category = await prisma_1.default.category.findUnique({ where: { id: categoryId } });
        if (!category)
            throw new Error("Categoria não encontrada");
        const nextCategory = await prisma_1.default.category.findFirst({
            where: { parentId: category.parentId, order: { gt: category.order } },
            orderBy: { order: "asc" },
        });
        if (!nextCategory)
            return;
        // Troca as posições
        await prisma_1.default.category.update({
            where: { id: categoryId },
            data: { order: nextCategory.order },
        });
        await prisma_1.default.category.update({
            where: { id: nextCategory.id },
            data: { order: category.order },
        });
    }
}
exports.MoveCategoryDownService = MoveCategoryDownService;
//# sourceMappingURL=MoveCategoryDownService.js.map
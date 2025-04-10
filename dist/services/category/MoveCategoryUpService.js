"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveCategoryUpService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class MoveCategoryUpService {
    async moveCategoryUp(categoryId) {
        const category = await prisma_1.default.category.findUnique({ where: { id: categoryId } });
        if (!category)
            throw new Error("Categoria não encontrada");
        const previousCategory = await prisma_1.default.category.findFirst({
            where: { parentId: category.parentId, order: { lt: category.order } },
            orderBy: { order: "desc" },
        });
        if (!previousCategory)
            return;
        // Troca as posições
        await prisma_1.default.category.update({
            where: { id: categoryId },
            data: { order: previousCategory.order },
        });
        await prisma_1.default.category.update({
            where: { id: previousCategory.id },
            data: { order: category.order },
        });
    }
}
exports.MoveCategoryUpService = MoveCategoryUpService;
//# sourceMappingURL=MoveCategoryUpService.js.map
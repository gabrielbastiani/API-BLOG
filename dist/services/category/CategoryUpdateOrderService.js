"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUpdateOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CategoryUpdateOrderService {
    async execute({ draggedId, targetId }) {
        return await prisma_1.default.category.update({
            where: { id: draggedId },
            data: {
                parentId: targetId,
            },
        });
    }
}
exports.CategoryUpdateOrderService = CategoryUpdateOrderService;
//# sourceMappingURL=CategoryUpdateOrderService.js.map
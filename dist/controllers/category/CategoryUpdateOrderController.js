"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUpdateOrderController = void 0;
const CategoryUpdateOrderService_1 = require("../../services/category/CategoryUpdateOrderService");
class CategoryUpdateOrderController {
    async handle(req, res) {
        const { draggedId, targetId } = req.body;
        const updateCategoryOrderService = new CategoryUpdateOrderService_1.CategoryUpdateOrderService();
        const updatedCategory = await updateCategoryOrderService.execute({ draggedId, targetId });
        return res.json(updatedCategory);
    }
}
exports.CategoryUpdateOrderController = CategoryUpdateOrderController;
//# sourceMappingURL=CategoryUpdateOrderController.js.map
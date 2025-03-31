"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDeleteController = void 0;
const CategoryDeleteService_1 = require("../../services/category/CategoryDeleteService");
class CategoryDeleteController {
    async handle(req, res) {
        let { id_delete, name } = req.body;
        if (!Array.isArray(id_delete)) {
            id_delete = [id_delete];
        }
        const detail_category = new CategoryDeleteService_1.CategoryDeleteService();
        const category = await detail_category.execute({ id_delete, name });
        return res.json(category);
    }
}
exports.CategoryDeleteController = CategoryDeleteController;
//# sourceMappingURL=CategoryDeleteController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUpdateDataController = void 0;
const CategoryUpdateDataService_1 = require("../../services/category/CategoryUpdateDataService");
class CategoryUpdateDataController {
    async handle(req, res) {
        const { category_id, name_category, description, status, parentId, order } = req.body;
        const update_category = new CategoryUpdateDataService_1.CategoryUpdateDataService();
        let imageToUpdate = req.body.image_category;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }
        const category = await update_category.execute({
            category_id,
            name_category,
            description,
            image_category: imageToUpdate,
            status,
            parentId,
            order
        });
        return res.json(category);
    }
}
exports.CategoryUpdateDataController = CategoryUpdateDataController;
//# sourceMappingURL=CategoryUpdateDataController.js.map
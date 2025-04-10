"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryCreateController = void 0;
const CategoryCreateService_1 = require("../../services/category/CategoryCreateService");
class CategoryCreateController {
    async handle(req, res) {
        const { user_id, name_category, image_category, description, parentId } = req.body;
        const create_category = new CategoryCreateService_1.CategoryCreateService();
        let imageToUpdate = image_category;
        if (!image_category && req.file) {
            imageToUpdate = req.file.filename;
        }
        const category = await create_category.execute({
            user_id,
            name_category,
            description,
            image_category: imageToUpdate,
            parentId
        });
        return res.json(category);
    }
}
exports.CategoryCreateController = CategoryCreateController;
//# sourceMappingURL=CategoryCreateController.js.map
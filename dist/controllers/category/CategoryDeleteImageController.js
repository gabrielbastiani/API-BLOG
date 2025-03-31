"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDeleteImageController = void 0;
const CategoryDeleteImageService_1 = require("../../services/category/CategoryDeleteImageService");
class CategoryDeleteImageController {
    async handle(req, res) {
        const category_id = req.query.category_id;
        const delete_image = new CategoryDeleteImageService_1.CategoryDeleteImageService();
        const category = await delete_image.execute({ category_id });
        return res.json(category);
    }
}
exports.CategoryDeleteImageController = CategoryDeleteImageController;
//# sourceMappingURL=CategoryDeleteImageController.js.map
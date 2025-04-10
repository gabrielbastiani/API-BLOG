"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const CategoriesService_1 = require("../../services/category/CategoriesService");
class CategoriesController {
    async handle(req, res) {
        const categoriesService = new CategoriesService_1.CategoriesService();
        const categories = await categoriesService.execute();
        return res.json(categories);
    }
}
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=CategoriesController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCategoryPostController = void 0;
const DataCategoryPostService_1 = require("../../services/category/DataCategoryPostService");
class DataCategoryPostController {
    async handle(req, res) {
        const slug_name_category = req.query.slug_name_category;
        const post_content = new DataCategoryPostService_1.DataCategoryPostService();
        const post = await post_content.execute({ slug_name_category });
        return res.json(post);
    }
}
exports.DataCategoryPostController = DataCategoryPostController;
//# sourceMappingURL=DataCategoryPostController.js.map
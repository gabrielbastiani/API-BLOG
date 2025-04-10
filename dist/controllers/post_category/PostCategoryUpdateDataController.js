"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryUpdateDataController = void 0;
const PostCategoryUpdateDataService_1 = require("../../services/post_category/PostCategoryUpdateDataService");
class PostCategoryUpdateDataController {
    async handle(req, res) {
        const categoryOnPost_id = req.query.categoryOnPost_id;
        const { post_id } = req.body;
        const update_category = new PostCategoryUpdateDataService_1.PostCategoryUpdateDataService();
        const category = await update_category.execute({
            categoryOnPost_id,
            post_id
        });
        return res.json(category);
    }
}
exports.PostCategoryUpdateDataController = PostCategoryUpdateDataController;
//# sourceMappingURL=PostCategoryUpdateDataController.js.map
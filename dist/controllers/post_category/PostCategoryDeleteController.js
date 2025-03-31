"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryDeleteController = void 0;
const PostCategoryDeleteService_1 = require("../../services/post_category/PostCategoryDeleteService");
class PostCategoryDeleteController {
    async handle(req, res) {
        const categoryOnPost_id = req.query.categoryOnPost_id;
        const delete_post_category = new PostCategoryDeleteService_1.PostCategoryDeleteService();
        const category = await delete_post_category.execute({ categoryOnPost_id });
        return res.json(category);
    }
}
exports.PostCategoryDeleteController = PostCategoryDeleteController;
//# sourceMappingURL=PostCategoryDeleteController.js.map
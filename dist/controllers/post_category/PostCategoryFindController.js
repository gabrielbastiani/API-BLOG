"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryFindController = void 0;
const PostCategoryFindService_1 = require("../../services/post_category/PostCategoryFindService");
class PostCategoryFindController {
    async handle(req, res) {
        const post_id = req.query.post_id;
        const categoryOnPost_id = req.query.categoryOnPost_id;
        const post_category = new PostCategoryFindService_1.PostCategoryFindService();
        const category = await post_category.execute({ post_id, categoryOnPost_id });
        return res.json(category);
    }
}
exports.PostCategoryFindController = PostCategoryFindController;
//# sourceMappingURL=PostCategoryFindController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryCreateController = void 0;
const PostCategoryCreateService_1 = require("../../services/post_category/PostCategoryCreateService");
class PostCategoryCreateController {
    async handle(req, res) {
        const { post_id, category_id } = req.body;
        const post_create = new PostCategoryCreateService_1.PostCategoryCreateService();
        const post = await post_create.execute({
            post_id, category_id
        });
        return res.json(post);
    }
}
exports.PostCategoryCreateController = PostCategoryCreateController;
//# sourceMappingURL=PostCategoryCreateController.js.map
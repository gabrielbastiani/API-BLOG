"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsCategoryController = void 0;
const PostsCategoryService_1 = require("../../services/category/PostsCategoryService");
class PostsCategoryController {
    async handle(req, res) {
        const { slug_name_category, page = 1, limit = 6, search = "", orderBy = "created_at", orderDirection = "desc", } = req.query;
        if (!slug_name_category) {
            return res.status(400).json({ error: "slug_name_category is required" });
        }
        const allPosts = new PostsCategoryService_1.PostsCategoryService();
        const posts = await allPosts.execute(String(slug_name_category), Number(page), Number(limit), String(search), String(orderBy), orderDirection);
        return res.json(posts);
    }
}
exports.PostsCategoryController = PostsCategoryController;
//# sourceMappingURL=PostsCategoryController.js.map
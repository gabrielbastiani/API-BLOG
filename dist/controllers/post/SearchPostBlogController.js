"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPostBlogController = void 0;
const SearchPostBlogService_1 = require("../../services/post/SearchPostBlogService");
const uuid_1 = require("uuid"); // Importando a função de validação
class SearchPostBlogController {
    async handle(req, res) {
        const { post_id, page = 1, limit = 6, search = "", orderBy = "created_at", orderDirection = "desc" } = req.query;
        // Validar o post_id se for passado
        if (post_id && !(0, uuid_1.validate)(post_id)) {
            return res.status(400).json({ error: "Invalid post_id format" });
        }
        const allPosts = new SearchPostBlogService_1.SearchPostBlogService();
        const posts = await allPosts.execute(post_id ? String(post_id) : undefined, // Passando post_id apenas se for válido
        Number(page), Number(limit), String(search), String(orderBy), orderDirection);
        return res.json(posts);
    }
}
exports.SearchPostBlogController = SearchPostBlogController;
//# sourceMappingURL=SearchPostBlogController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllPostController = void 0;
const AllPostService_1 = require("../../services/post/AllPostService");
const uuid_1 = require("uuid");
class AllPostController {
    async handle(req, res) {
        const { post_id, page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate } = req.query;
        // Validar o post_id se for passado
        if (post_id && !(0, uuid_1.validate)(post_id)) {
            return res.status(400).json({ error: "Invalid post_id format" });
        }
        const allPosts = new AllPostService_1.AllPostService();
        const posts = await allPosts.execute(post_id ? String(post_id) : undefined, // Passando post_id apenas se for válido
        Number(page), Number(limit), String(search), String(orderBy), orderDirection, startDate ? String(startDate) : undefined, endDate ? String(endDate) : undefined);
        return res.json(posts);
    }
}
exports.AllPostController = AllPostController;
//# sourceMappingURL=AllPostController.js.map
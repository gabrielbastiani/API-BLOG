"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavBarSearchBlogPostController = void 0;
const NavBarSearchBlogPostService_1 = require("../../services/post/NavBarSearchBlogPostService");
class NavBarSearchBlogPostController {
    async handle(req, res) {
        const { search = "" } = req.query;
        const allPosts = new NavBarSearchBlogPostService_1.NavBarSearchBlogPostService();
        const posts = await allPosts.execute(String(search));
        return res.json(posts);
    }
}
exports.NavBarSearchBlogPostController = NavBarSearchBlogPostController;
//# sourceMappingURL=NavBarSearchBlogPostController.js.map
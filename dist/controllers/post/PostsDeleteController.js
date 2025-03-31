"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsDeleteController = void 0;
const PostDeleteService_1 = require("../../services/post/PostDeleteService");
class PostsDeleteController {
    async handle(req, res) {
        let { id_delete, name } = req.body;
        if (!Array.isArray(id_delete)) {
            id_delete = [id_delete];
        }
        const detail_post = new PostDeleteService_1.PostDeleteService();
        const posts = await detail_post.execute({ id_delete, name });
        return res.json(posts);
    }
}
exports.PostsDeleteController = PostsDeleteController;
//# sourceMappingURL=PostsDeleteController.js.map
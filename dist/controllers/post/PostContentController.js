"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostContentController = void 0;
const PostContentService_1 = require("../../services/post/PostContentService");
class PostContentController {
    async handle(req, res) {
        const url_post = req.query.url_post;
        const post_content = new PostContentService_1.PostContentService();
        const post = await post_content.execute({ url_post });
        return res.json(post);
    }
}
exports.PostContentController = PostContentController;
//# sourceMappingURL=PostContentController.js.map
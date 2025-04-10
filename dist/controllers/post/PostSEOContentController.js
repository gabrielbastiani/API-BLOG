"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSEOContentController = void 0;
const PostSEOContentService_1 = require("../../services/post/PostSEOContentService");
class PostSEOContentController {
    async handle(req, res) {
        const post_content = new PostSEOContentService_1.PostSEOContentService();
        const post = await post_content.execute();
        return res.json(post);
    }
}
exports.PostSEOContentController = PostSEOContentController;
//# sourceMappingURL=PostSEOContentController.js.map
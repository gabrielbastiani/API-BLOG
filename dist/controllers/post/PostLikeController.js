"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikeController = void 0;
const PostLikeService_1 = require("../../services/post/PostLikeService");
class PostLikeController {
    async handle(req, res) {
        const { post_id, isLike } = req.body;
        const postServicelikes = new PostLikeService_1.PostLikeService();
        const result = await postServicelikes.execute({
            post_id,
            req,
            isLike: isLike === true || isLike === "true",
        });
        return res.json(result);
    }
}
exports.PostLikeController = PostLikeController;
//# sourceMappingURL=PostLikeController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentLikeController = void 0;
const CommentLikeService_1 = require("../../services/comment/CommentLikeService");
class CommentLikeController {
    async handle(req, res) {
        const { comment_id, isLike } = req.body;
        const commentLikeService = new CommentLikeService_1.CommentLikeService();
        const result = await commentLikeService.execute({
            comment_id,
            req,
            isLike: isLike === true || isLike === "true",
        });
        return res.json(result);
    }
}
exports.CommentLikeController = CommentLikeController;
//# sourceMappingURL=CommentLikeController.js.map
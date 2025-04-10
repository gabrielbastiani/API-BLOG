"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentAllPostController = void 0;
const CommentAllPostService_1 = require("../../services/comment/CommentAllPostService");
class CommentAllPostController {
    async handle(req, res) {
        const post_id = req.query.post_id;
        const allComment = new CommentAllPostService_1.CommentAllPostService();
        const commentes = await allComment.execute({ post_id });
        return res.json(commentes);
    }
}
exports.CommentAllPostController = CommentAllPostController;
//# sourceMappingURL=CommentAllPostController.js.map
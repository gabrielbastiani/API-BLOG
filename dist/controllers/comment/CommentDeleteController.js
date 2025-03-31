"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentDeleteController = void 0;
const CommentDeleteService_1 = require("../../services/comment/CommentDeleteService");
class CommentDeleteController {
    async handle(req, res) {
        const comment_id = req.query.comment_id;
        const delete_comment = new CommentDeleteService_1.CommentDeleteService();
        const comment = await delete_comment.execute({ comment_id });
        return res.json(comment);
    }
}
exports.CommentDeleteController = CommentDeleteController;
//# sourceMappingURL=CommentDeleteController.js.map
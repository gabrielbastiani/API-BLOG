"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentStatusController = void 0;
const CommentStatusService_1 = require("../../services/comment/CommentStatusService");
class CommentStatusController {
    async handle(req, res) {
        const { comment_id, status } = req.body;
        const comment_status = new CommentStatusService_1.CommentStatusService();
        const status_comment = await comment_status.execute({ comment_id, status });
        return res.json(status_comment);
    }
}
exports.CommentStatusController = CommentStatusController;
//# sourceMappingURL=CommentStatusController.js.map
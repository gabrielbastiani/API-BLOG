"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllCommentController = void 0;
const AllCommentService_1 = require("../../services/comment/AllCommentService");
class AllCommentController {
    async handle(req, res) {
        const { page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate } = req.query;
        const allComment = new AllCommentService_1.AllCommentService();
        const commentes = await allComment.execute(Number(page), Number(limit), String(search), String(orderBy), orderDirection, startDate ? String(startDate) : undefined, endDate ? String(endDate) : undefined);
        return res.json(commentes);
    }
}
exports.AllCommentController = AllCommentController;
//# sourceMappingURL=AllCommentController.js.map
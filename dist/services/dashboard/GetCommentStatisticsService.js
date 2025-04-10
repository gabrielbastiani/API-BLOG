"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommentStatisticsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetCommentStatisticsService {
    async execute() {
        const commentsByStatus = await prisma_1.default.comment.groupBy({
            by: ['status'],
            _count: { id: true },
        });
        const metrics = await prisma_1.default.comment.findMany({
            select: {
                id: true,
                comment: true,
                comment_like: true,
                comment_dislike: true,
            },
        });
        const metricsCommentsLikesDislikes = metrics.map((com) => ({
            ...com,
            comment: com.comment.length > 30
                ? `${com.comment.slice(0, 30)}...`
                : com.comment,
        }));
        const totalComment = await prisma_1.default.comment.count();
        return { commentsByStatus, totalComment, metricsCommentsLikesDislikes };
    }
}
exports.GetCommentStatisticsService = GetCommentStatisticsService;
//# sourceMappingURL=GetCommentStatisticsService.js.map
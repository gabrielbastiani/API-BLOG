"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllCommentService = void 0;
const moment_1 = __importDefault(require("moment"));
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
class AllCommentService {
    async execute(page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate) {
        const skip = (page - 1) * limit;
        // Construção da cláusula 'where' com filtro de texto e data
        const whereClause = {
            AND: [
                // Filtro de texto
                search
                    ? {
                        OR: [
                            { status: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                            { post: { title: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } } },
                            { userBlog: { name: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } } },
                        ],
                    }
                    : {},
                // Filtro de datas
                startDate && endDate
                    ? {
                        created_at: {
                            gte: (0, moment_1.default)(startDate).startOf("day").toISOString(),
                            lte: (0, moment_1.default)(endDate).endOf("day").toISOString(),
                        },
                    }
                    : {},
            ],
        };
        // Buscar os comentários com paginação e ordenação
        const all_comments = await prisma_1.default.comment.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
            include: {
                commentLikes: true,
                post: true,
                userBlog: true,
                replies: true,
                parent: true,
            },
        });
        // Calcular o total de respostas (diretas e indiretas)
        const enrichedComments = await Promise.all(all_comments.map(async (comment) => {
            // Buscar respostas diretas e indiretas
            const directReplies = await prisma_1.default.comment.count({
                where: { parentId: comment.id },
            });
            const indirectReplies = await prisma_1.default.comment.count({
                where: { parent: { parentId: comment.id } },
            });
            return {
                ...comment,
                replyCount: directReplies + indirectReplies,
            };
        }));
        const total_comments = await prisma_1.default.comment.count({
            where: whereClause,
        });
        return {
            comments: enrichedComments,
            currentPage: page,
            totalPages: Math.ceil(total_comments / limit),
            totalContacts: total_comments,
        };
    }
}
exports.AllCommentService = AllCommentService;
//# sourceMappingURL=AllCommentService.js.map
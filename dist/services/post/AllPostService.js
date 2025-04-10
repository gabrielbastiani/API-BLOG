"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllPostService = void 0;
const moment_1 = __importDefault(require("moment"));
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
class AllPostService {
    async execute(post_id, page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate) {
        const skip = (page - 1) * limit;
        const whereClause = {
            ...(search ? {
                OR: [
                    { author: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    { title: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                ]
            } : {}),
            ...(startDate && endDate ? {
                created_at: {
                    gte: (0, moment_1.default)(startDate).startOf('day').toISOString(),
                    lte: (0, moment_1.default)(endDate).endOf('day').toISOString(),
                }
            } : {})
        };
        const all_posts = await prisma_1.default.post.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                tags: {
                    include: {
                        tag: true
                    }
                },
                comment: true
            }
        });
        const total_posts = await prisma_1.default.post.count({
            where: whereClause,
        });
        // --- UNIQUE POST ---//
        let post_unique = null;
        if (post_id) {
            post_unique = await prisma_1.default.post.findUnique({
                where: {
                    id: post_id,
                },
                include: {
                    categories: {
                        include: {
                            category: true,
                        },
                    },
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
                },
            });
        }
        return {
            unique_post: post_unique,
            posts: all_posts,
            currentPage: page,
            totalPages: Math.ceil(total_posts / limit),
            totalPosts: total_posts,
        };
    }
}
exports.AllPostService = AllPostService;
//# sourceMappingURL=AllPostService.js.map
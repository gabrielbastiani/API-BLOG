"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPostBlogService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
class SearchPostBlogService {
    async execute(post_id, page = 1, limit = 6, search = "", orderBy = "created_at", orderDirection = "desc") {
        const skip = (page - 1) * limit;
        const whereClause = {
            status: client_1.StatusPost.Disponivel,
            ...(search ? {
                OR: [
                    { text_post: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    { title: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                ]
            } : {})
        };
        const all_posts = await prisma_1.default.post.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection }
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
                    status: client_1.StatusPost.Disponivel
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
        // --- LAST POST ---
        const last_post = await prisma_1.default.post.findMany({
            where: {
                status: client_1.StatusPost.Disponivel,
            },
            orderBy: [
                { publish_at: "asc" },
                { created_at: "asc" },
            ],
        });
        // --- MOST VIEWS POST ---
        const most_views_post = await prisma_1.default.post.findMany({
            where: {
                status: client_1.StatusPost.Disponivel,
            },
            orderBy: {
                views: "desc"
            }
        });
        return {
            most_views_post: most_views_post,
            last_post: last_post,
            unique_post: post_unique,
            posts: all_posts,
            currentPage: page,
            totalPages: Math.ceil(total_posts / limit),
            totalPosts: total_posts,
        };
    }
}
exports.SearchPostBlogService = SearchPostBlogService;
//# sourceMappingURL=SearchPostBlogService.js.map
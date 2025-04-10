"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
class PostsCategoryService {
    async execute(slug_name_category, page = 1, limit = 6, search = "", orderBy = "created_at", orderDirection = "desc") {
        const skip = (page - 1) * limit;
        const whereClause = {
            AND: [
                {
                    categories: {
                        some: {
                            category: {
                                slug_name_category,
                            },
                        },
                    },
                },
                {
                    status: {
                        notIn: ["Programado", "Indisponivel"]
                    }
                },
                ...(search
                    ? [
                        {
                            OR: [
                                {
                                    text_post: {
                                        contains: search,
                                        mode: client_1.Prisma.QueryMode.insensitive,
                                    },
                                },
                                {
                                    title: {
                                        contains: search,
                                        mode: client_1.Prisma.QueryMode.insensitive,
                                    },
                                },
                            ],
                        },
                    ]
                    : []),
            ],
        };
        const all_posts = await prisma_1.default.post.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: { [orderBy]: orderDirection },
            include: {
                categories: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        const total_posts = await prisma_1.default.post.count({
            where: whereClause,
        });
        // -- UNIQUE CATEGORY -- //
        const data_category = await prisma_1.default.category.findFirst({
            where: {
                slug_name_category: slug_name_category
            }
        });
        return {
            data_category: data_category,
            posts: all_posts,
            currentPage: page,
            totalPages: Math.ceil(total_posts / limit),
            totalPosts: total_posts,
        };
    }
}
exports.PostsCategoryService = PostsCategoryService;
//# sourceMappingURL=PostsCategoryService.js.map
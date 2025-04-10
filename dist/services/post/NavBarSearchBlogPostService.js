"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavBarSearchBlogPostService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
class NavBarSearchBlogPostService {
    async execute(search = "") {
        const whereClause = {
            status: client_1.StatusPost.Disponivel,
            ...(search ? {
                OR: [
                    { author: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    { title: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                ]
            } : {})
        };
        const all_posts = await prisma_1.default.post.findMany({
            where: whereClause,
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
        return all_posts;
    }
}
exports.NavBarSearchBlogPostService = NavBarSearchBlogPostService;
//# sourceMappingURL=NavBarSearchBlogPostService.js.map
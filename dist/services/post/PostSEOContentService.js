"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSEOContentService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class PostSEOContentService {
    async execute() {
        const post = await prisma_1.default.post.findMany({
            where: {
                status: "Disponivel"
            },
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
                comment: {
                    include: {
                        replies: true,
                        userBlog: true
                    }
                }
            }
        });
        return post;
    }
}
exports.PostSEOContentService = PostSEOContentService;
//# sourceMappingURL=PostSEOContentService.js.map
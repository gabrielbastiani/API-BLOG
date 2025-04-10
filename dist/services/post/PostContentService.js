"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostContentService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class PostContentService {
    async execute({ url_post }) {
        const post = await prisma_1.default.post.findFirst({
            where: {
                OR: [
                    { custom_url: url_post },
                    { slug_title_post: url_post }
                ]
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
exports.PostContentService = PostContentService;
//# sourceMappingURL=PostContentService.js.map
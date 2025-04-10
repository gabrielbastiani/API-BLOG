"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReloadPostDataService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ReloadPostDataService {
    async execute({ post_id }) {
        const post = await prisma_1.default.post.findFirst({
            where: {
                id: post_id
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
exports.ReloadPostDataService = ReloadPostDataService;
//# sourceMappingURL=ReloadPostDataService.js.map
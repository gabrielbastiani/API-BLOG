"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryFindService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class PostCategoryFindService {
    async execute({ post_id, categoryOnPost_id }) {
        if (post_id) {
            const post_categories = await prisma_1.default.categoryOnPost.findMany({
                where: {
                    post_id: post_id
                }
            });
            return post_categories;
        }
        if (categoryOnPost_id) {
            const post_category = await prisma_1.default.categoryOnPost.findUnique({
                where: {
                    id: categoryOnPost_id
                }
            });
            return post_category;
        }
    }
}
exports.PostCategoryFindService = PostCategoryFindService;
//# sourceMappingURL=PostCategoryFindService.js.map
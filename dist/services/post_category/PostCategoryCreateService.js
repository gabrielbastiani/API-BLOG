"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryCreateService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class PostCategoryCreateService {
    async execute({ post_id, category_id }) {
        const post = await prisma_1.default.categoryOnPost.create({
            data: {
                post_id: post_id,
                category_id: category_id
            }
        });
        return post;
    }
}
exports.PostCategoryCreateService = PostCategoryCreateService;
//# sourceMappingURL=PostCategoryCreateService.js.map
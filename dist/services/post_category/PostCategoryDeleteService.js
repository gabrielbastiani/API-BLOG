"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryDeleteService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class PostCategoryDeleteService {
    async execute({ categoryOnPost_id }) {
        const post_category_delete = await prisma_1.default.categoryOnPost.delete({
            where: {
                id: categoryOnPost_id
            }
        });
        return post_category_delete;
    }
}
exports.PostCategoryDeleteService = PostCategoryDeleteService;
//# sourceMappingURL=PostCategoryDeleteService.js.map
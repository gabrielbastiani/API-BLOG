"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryUpdateDataService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class PostCategoryUpdateDataService {
    async execute({ categoryOnPost_id, post_id }) {
        const dataToUpdate = {};
        if (post_id) {
            dataToUpdate.post_id = post_id;
        }
        const update_category = await prisma_1.default.categoryOnPost.update({
            where: {
                id: categoryOnPost_id
            },
            data: dataToUpdate
        });
        return update_category;
    }
}
exports.PostCategoryUpdateDataService = PostCategoryUpdateDataService;
//# sourceMappingURL=PostCategoryUpdateDataService.js.map
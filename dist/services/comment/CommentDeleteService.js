"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentDeleteService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CommentDeleteService {
    async execute({ comment_id }) {
        const comment_delete = await prisma_1.default.comment.delete({
            where: {
                id: comment_id
            }
        });
        return comment_delete;
    }
}
exports.CommentDeleteService = CommentDeleteService;
//# sourceMappingURL=CommentDeleteService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlogDetailService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class UserBlogDetailService {
    async execute({ user_id }) {
        const user = await prisma_1.default.userBlog.findFirst({
            where: {
                id: user_id
            },
            select: {
                created_at: true,
                email: true,
                id: true,
                image_user: true,
                name: true,
                slug_name: true,
                status: true
            }
        });
        return user;
    }
}
exports.UserBlogDetailService = UserBlogDetailService;
//# sourceMappingURL=UserBlogDetailService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UserDetailService {
    async execute({ user_id }) {
        const user = await prisma_1.default.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                created_at: true,
                email: true,
                id: true,
                image_user: true,
                role: true,
                name: true,
                slug_name: true,
                status: true
            }
        });
        return user;
    }
}
exports.UserDetailService = UserDetailService;
//# sourceMappingURL=UserDetailService.js.map
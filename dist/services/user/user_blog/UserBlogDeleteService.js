"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlogDeleteService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class UserBlogDeleteService {
    async execute({ id_delete, name, user_id }) {
        const users = await prisma_1.default.userBlog.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        const deletedUsers = await prisma_1.default.userBlog.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        await prisma_1.default.notificationUser.createMany({
            data: users.map((user) => ({
                user_id: user_id,
                message: `Usuário do blog ${user.name} foi deletado pelo usuário ${name}.`,
                type: "user"
            }))
        });
        return deletedUsers;
    }
}
exports.UserBlogDeleteService = UserBlogDeleteService;
//# sourceMappingURL=UserBlogDeleteService.js.map
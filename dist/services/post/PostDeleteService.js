"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDeleteService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class PostDeleteService {
    async execute({ id_delete, name }) {
        const posts = await prisma_1.default.post.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        posts.forEach((post) => {
            if (post?.image_post) {
                const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + post?.image_post);
                fs_1.default.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image for post ${post.id}: ${err.message}`);
                    }
                    else {
                        console.log(`Image for post ${post.id} deleted successfully`);
                    }
                });
            }
        });
        const deleted_posts = await prisma_1.default.post.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        const users_superAdmins = await prisma_1.default.user.findMany({
            where: {
                role: client_1.RoleUser.SUPER_ADMIN
            }
        });
        const users_admins = await prisma_1.default.user.findMany({
            where: {
                role: client_1.RoleUser.ADMIN
            }
        });
        const all_user_ids = [
            ...users_superAdmins.map(user => user.id),
            ...users_admins.map(user => user.id)
        ];
        await prisma_1.default.notificationUser.createMany({
            data: posts.flatMap((post) => all_user_ids.map((user_id) => ({
                user_id,
                message: `Post(s) ${post.title} foi deletada(s) pelo usuário ${name}.`,
                type: "post"
            })))
        });
        return deleted_posts;
    }
}
exports.PostDeleteService = PostDeleteService;
//# sourceMappingURL=PostDeleteService.js.map
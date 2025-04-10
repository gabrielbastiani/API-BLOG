"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCreateService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class PostCreateService {
    async execute({ author, title, image_post, text_post, status, publish_at, tags, categories, seo_description, seo_keywords, custom_url }) {
        function removerAcentos(s) {
            return s
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }
        const statusEnum = Object.values(client_1.StatusPost).includes(status)
            ? status
            : client_1.StatusPost.Disponivel;
        const keywords = Array.isArray(seo_keywords) ? seo_keywords : JSON.parse(seo_keywords);
        const post = await prisma_1.default.post.create({
            data: {
                author,
                title,
                slug_title_post: removerAcentos(title),
                image_post,
                text_post,
                status: statusEnum,
                publish_at,
                seo_description,
                seo_keywords: keywords, /* @ts-ignore */
                custom_url: removerAcentos(custom_url)
            },
        });
        if (categories && categories.length > 0) {
            await prisma_1.default.categoryOnPost.createMany({
                data: categories.map((category_id) => ({
                    post_id: post.id,
                    category_id,
                })),
            });
        }
        if (tags && tags.length > 0) {
            await prisma_1.default.tagOnPost.createMany({
                data: tags.map((tag_id) => ({
                    post_id: post.id,
                    tag_id,
                })),
            });
        }
        const users_superAdmins = await prisma_1.default.user.findMany({ where: { role: client_1.RoleUser.SUPER_ADMIN } });
        const users_admins = await prisma_1.default.user.findMany({ where: { role: client_1.RoleUser.ADMIN } });
        const all_user_ids = [
            ...users_superAdmins.map((user) => user.id),
            ...users_admins.map((user) => user.id),
        ];
        const notificationsData = all_user_ids.map((user_id) => ({
            user_id,
            message: `Post de título "${post.title}" foi criado.`,
            type: "post",
        }));
        await prisma_1.default.notificationUser.createMany({ data: notificationsData });
        return post;
    }
}
exports.PostCreateService = PostCreateService;
//# sourceMappingURL=PostCreateService.js.map
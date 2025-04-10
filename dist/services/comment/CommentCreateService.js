"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentCreateService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv/config');
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
class CommentCreateService {
    async execute({ post_id, userBlog_id, name_user, image_user, comment, parentId }) {
        if (!post_id || !userBlog_id || !comment) {
            throw new Error("Campos obrigatórios ausentes: post_id, userBlog_id ou comment.");
        }
        let computedNivel = 0;
        if (parentId) {
            const parentComment = await prisma_1.default.comment.findUnique({
                where: { id: parentId },
            });
            if (!parentComment) {
                throw new Error("Comentário pai não encontrado.");
            }
            computedNivel = (parentComment.nivel || 0) + 1;
        }
        const comment_create = await prisma_1.default.comment.create({
            data: {
                post_id,
                userBlog_id,
                name_user,
                image_user,
                comment,
                parentId,
                nivel: computedNivel,
            },
            include: {
                post: true,
                userBlog: true
            }
        });
        const [users_superAdmins, users_admins, blog_user, blog_post] = await Promise.all([
            prisma_1.default.user.findMany({ where: { role: client_1.RoleUser.SUPER_ADMIN } }),
            prisma_1.default.user.findMany({ where: { role: client_1.RoleUser.ADMIN } }),
            prisma_1.default.userBlog.findUnique({ where: { id: userBlog_id } }),
            prisma_1.default.post.findUnique({ where: { id: post_id } }),
        ]);
        const all_user_ids = [
            ...users_superAdmins.map(user => user.id),
            ...users_admins.map(user => user.id),
        ];
        const message = `${blog_user?.name || "Um usuário"} deixou seu comentário no post ${blog_post?.title || "desconhecido"}.`;
        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message,
            type: "comment",
        }));
        await prisma_1.default.notificationUser.createMany({ data: notificationsData });
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const infos_blog = await prisma_1.default.configurationBlog.findFirst();
        const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/analise_comentario_artigo.ejs`);
        const domain_site = process.env.URL_SITE;
        const domain_api = process.env.URL_API;
        const data = await ejs_1.default.renderFile(requiredPath, {
            name: name_user,
            post: comment_create.post.title,
            logo: infos_blog?.logo,
            name_blog: infos_blog?.name_blog,
            domain_site: domain_site,
            domain_api: domain_api
        });
        await transporter.sendMail({
            from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`, /* @ts-ignore */
            to: `${comment_create?.userBlog.email}`,
            subject: `Comentario/resposta em analise`,
            html: data
        });
        return comment_create;
    }
}
exports.CommentCreateService = CommentCreateService;
//# sourceMappingURL=CommentCreateService.js.map
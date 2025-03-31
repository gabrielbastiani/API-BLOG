"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentStatusService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv/config');
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
class CommentStatusService {
    async execute({ comment_id, status }) {
        const update_status = await prisma_1.default.comment.update({
            where: {
                id: comment_id
            },
            data: {
                status: status
            },
            include: {
                userBlog: true,
                post: true
            }
        });
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            }
        });
        const infos_blog = await prisma_1.default.configurationBlog.findFirst();
        const domain_site = process.env.URL_SITE;
        const domain_api = process.env.URL_API;
        if (status === "Pendente") {
            const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/status_comentario_artigo.ejs`);
            const data = await ejs_1.default.renderFile(requiredPath, {
                name: update_status.name_user,
                post: update_status.post.title,
                status: status,
                logo: infos_blog?.logo,
                name_blog: infos_blog?.name_blog,
                domain_site: domain_site,
                domain_api: domain_api
            });
            await transporter.sendMail({
                from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`, /* @ts-ignore */
                to: update_status.userBlog.email,
                subject: `Status do seu comentario/resposta`,
                html: data
            });
        }
        if (status === "Recusado") {
            const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/status_comentario_artigo.ejs`);
            const data = await ejs_1.default.renderFile(requiredPath, {
                name: update_status.name_user,
                post: update_status.post.title,
                status: status,
                logo: infos_blog?.logo,
                name_blog: infos_blog?.name_blog,
                domain_site: domain_site,
                domain_api: domain_api
            });
            await transporter.sendMail({
                from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`, /* @ts-ignore */
                to: update_status.userBlog.email,
                subject: `Status do seu comentario/resposta`,
                html: data
            });
        }
        if (status === "Aprovado") {
            const domain_sitee = process.env.URL_SITE;
            const domain_apii = process.env.URL_API;
            const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/status_comentario_artigo.ejs`);
            const data = await ejs_1.default.renderFile(requiredPath, {
                name: update_status.name_user,
                post: update_status.post.title,
                status: status,
                logo: infos_blog?.logo,
                name_blog: infos_blog?.name_blog,
                domain_site: domain_sitee,
                domain_api: domain_apii
            });
            await transporter.sendMail({
                from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`, /* @ts-ignore */
                to: update_status.userBlog.email,
                subject: `Status do seu comentario/resposta`,
                html: data
            });
            const threadUserComments = await prisma_1.default.comment.findMany({
                where: {
                    OR: [
                        { id: update_status.parentId },
                        { parentId: update_status.id },
                    ],
                    post_id: update_status.post_id,
                },
                distinct: ['userBlog_id'],
                select: {
                    userBlog: {
                        select: {
                            email: true,
                            name: true,
                        },
                    },
                },
            });
            const emailsToNotify = threadUserComments /* @ts-ignore */
                .filter((user) => user.userBlog.email !== update_status?.userBlog.email) /* @ts-ignore */
                .map((user) => user.userBlog.email);
            const domain_site = process.env.URL_SITE;
            const domain_api = process.env.URL_API;
            const emailTemplatePath = path_1.default.join(__dirname, `../emails_transacionais/resposta_comentario.ejs`);
            const emailData = await ejs_1.default.renderFile(emailTemplatePath, {
                name: update_status.name_user,
                post: update_status.post.title,
                status: status,
                logo: infos_blog?.logo,
                name_blog: infos_blog?.name_blog,
                domain_site: domain_site,
                domain_api: domain_api
            });
            await Promise.all(emailsToNotify.map((email) => transporter.sendMail({
                from: `"${infos_blog?.name_blog}" <${infos_blog?.email_blog}>`,
                to: email,
                subject: `Atualização no status de um comentário no qual você participou`,
                html: emailData
            })));
        }
        return update_status;
    }
}
exports.CommentStatusService = CommentStatusService;
//# sourceMappingURL=CommentStatusService.js.map
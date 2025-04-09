import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";
import nodemailer from "nodemailer";
require('dotenv/config');
import ejs from 'ejs';
import path from "path";

interface CommentRequest {
    post_id: string;
    userBlog_id: string;
    name_user?: string;
    image_user?: string;
    comment: string;
    parentId?: string;
    nivel?: number;
}

class CommentCreateService {
    async execute({ post_id, userBlog_id, name_user, image_user, comment, parentId }: CommentRequest) {
        if (!post_id || !userBlog_id || !comment) {
            throw new Error("Campos obrigatórios ausentes: post_id, userBlog_id ou comment.");
        }

        let computedNivel = 0;
        if (parentId) {
            const parentComment = await prismaClient.comment.findUnique({
                where: { id: parentId },
            });

            if (!parentComment) {
                throw new Error("Comentário pai não encontrado.");
            }

            computedNivel = (parentComment.nivel || 0) + 1;
        }

        const comment_create = await prismaClient.comment.create({
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
            prismaClient.user.findMany({ where: { role: RoleUser.SUPER_ADMIN } }),
            prismaClient.user.findMany({ where: { role: RoleUser.ADMIN } }),
            prismaClient.userBlog.findUnique({ where: { id: userBlog_id } }),
            prismaClient.post.findUnique({ where: { id: post_id } }),
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

        await prismaClient.notificationUser.createMany({ data: notificationsData });

        const transporter = nodemailer.createTransport({
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

        const infos_blog = await prismaClient.configurationBlog.findFirst();

        const requiredPath = path.join(__dirname, `../emails_transacionais/analise_comentario_artigo.ejs`);

        const domain_site = process.env.URL_SITE;
        const domain_api = process.env.URL_API;

        const data = await ejs.renderFile(requiredPath, {
            name: name_user,
            post: comment_create.post.title,
            logo: infos_blog?.logo,
            name_blog: infos_blog?.name_blog,
            domain_site: domain_site,
            domain_api: domain_api
        });

        await transporter.sendMail({
            from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,/* @ts-ignore */
            to: `${comment_create?.userBlog.email}`,
            subject: `Comentario/resposta em analise`,
            html: data
        });

        return comment_create;
    }
}

export { CommentCreateService }
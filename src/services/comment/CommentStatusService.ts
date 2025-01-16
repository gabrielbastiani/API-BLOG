import prismaClient from '../../prisma';
import nodemailer from "nodemailer";
require('dotenv/config');
import ejs from 'ejs';
import path from "path";

interface CommentRequest {
    comment_id: string;
    status: string;
}

class CommentStatusService {
    async execute({ comment_id, status }: CommentRequest) {
        const update_status = await prismaClient.comment.update({
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

        const transporter = nodemailer.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            }
        });

        const infos_blog = await prismaClient.configurationBlog.findFirst();

        if (status === "Pendente") {
            const requiredPath = path.join(__dirname, `../emails_transacionais/status_comentario_artigo.ejs`);
            const data = await ejs.renderFile(requiredPath, {
                name: update_status.name_user,
                post: update_status.post.title,
                status: status,
                logo: infos_blog.logo,
                name_blog: infos_blog.name_blog
            });
    
            await transporter.sendMail({
                from: `"${infos_blog.name_blog} " <${infos_blog.email_blog}>`,
                to: update_status.userBlog.email,
                subject: `Status do seu comentario/resposta`,
                html: data
            });
        }

        if (status === "Recusado") {
            const requiredPath = path.join(__dirname, `../emails_transacionais/status_comentario_artigo.ejs`);
            const data = await ejs.renderFile(requiredPath, {
                name: update_status.name_user,
                post: update_status.post.title,
                status: status,
                logo: infos_blog.logo,
                name_blog: infos_blog.name_blog
            });
    
            await transporter.sendMail({
                from: `"${infos_blog.name_blog} " <${infos_blog.email_blog}>`,
                to: update_status.userBlog.email,
                subject: `Status do seu comentario/resposta`,
                html: data
            });
        }

        if (status === "Aprovado") {
            const requiredPath = path.join(__dirname, `../emails_transacionais/status_comentario_artigo.ejs`);
            const data = await ejs.renderFile(requiredPath, {
                name: update_status.name_user,
                post: update_status.post.title,
                status: status,
                logo: infos_blog.logo,
                name_blog: infos_blog.name_blog
            });
    
            await transporter.sendMail({
                from: `"${infos_blog.name_blog} " <${infos_blog.email_blog}>`,
                to: update_status.userBlog.email,
                subject: `Status do seu comentario/resposta`,
                html: data
            });
        }

        return update_status;
    }
}

export { CommentStatusService };
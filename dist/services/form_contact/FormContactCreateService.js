"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormContactCreateService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv/config');
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
class FormContactCreateService {
    async execute({ email_user, name_user, subject, menssage }) {
        function removerAcentos(s) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }
        const comment_create = await prisma_1.default.form_contact.create({
            data: {
                email_user: email_user,
                name_user: name_user,
                slug_name_user: removerAcentos(name_user),
                subject: subject,
                menssage: menssage
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
        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message: "Formulario de contato enviado",
            type: "contact_form"
        }));
        await prisma_1.default.notificationUser.createMany({
            data: notificationsData
        });
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
        const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/criacao_de_mensagem_formulario.ejs`);
        const domain_site = process.env.URL_SITE;
        const domain_api = process.env.URL_API;
        const data = await ejs_1.default.renderFile(requiredPath, {
            name: name_user,
            menssage: menssage,
            subject: subject,
            logo: infos_blog?.logo,
            name_blog: infos_blog?.name_blog,
            domain_site: domain_site,
            domain_api: domain_api
        });
        await transporter.sendMail({
            from: `"${infos_blog?.name_blog} " <${email_user}>`,
            to: `${infos_blog?.email_blog}`,
            subject: `Alguém enviou uma mensagem para o ${infos_blog?.name_blog}`,
            html: data
        });
        return comment_create;
    }
}
exports.FormContactCreateService = FormContactCreateService;
//# sourceMappingURL=FormContactCreateService.js.map
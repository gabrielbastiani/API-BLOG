"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlogCreateService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv/config');
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
class UserBlogCreateService {
    async execute({ name, email, password, image_user, newsletter }) {
        const newsletterBool = newsletter === "true" ? true : newsletter === "false" ? false : undefined;
        if (newsletterBool === undefined) {
            throw new Error("Invalid value for 'newsletter'. Use 'true' or 'false'.");
        }
        function removerAcentos(s) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }
        if (!email) {
            throw new Error("Email incorrect");
        }
        const userAlreadyExists = await prisma_1.default.userBlog.findFirst({
            where: {
                email: email,
            }
        });
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 8);
        const user_create = await prisma_1.default.userBlog.create({
            data: {
                name: name,
                slug_name: removerAcentos(name),
                email: email,
                image_user: image_user,
                password: passwordHash,
                newsletter: newsletterBool
            }
        });
        if (newsletterBool === true) {
            await prisma_1.default.newsletter.create({
                data: {
                    email_user: email
                }
            });
        }
        const users_superAdmins = await prisma_1.default.user.findMany({
            where: {
                role: client_1.RoleUser.SUPER_ADMIN
            }
        });
        const all_user_ids = [
            ...users_superAdmins.map(user => user.id)
        ];
        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message: "Usuário do blog criado com sucesso",
            type: "user"
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
        const requiredPath = path_1.default.join(__dirname, `../../emails_transacionais/criacao_de_usuario_blog.ejs`);
        const domain_site = process.env.URL_SITE;
        const domain_api = process.env.URL_API;
        const data = await ejs_1.default.renderFile(requiredPath, {
            name: name,
            logo: infos_blog?.logo,
            name_blog: infos_blog?.name_blog,
            domain_site: domain_site,
            domain_api: domain_api
        });
        transporter.sendMail({
            from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,
            to: `${infos_blog?.email_blog}`,
            subject: `Novo usuario do ${infos_blog?.name_blog}`,
            html: data
        });
        return user_create;
    }
}
exports.UserBlogCreateService = UserBlogCreateService;
//# sourceMappingURL=UserBlogCreateService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv/config');
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
class UserCreateService {
    async execute({ name, email, password, image_user, role, send_email }) {
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
        const userAlreadyExists = await prisma_1.default.user.findFirst({
            where: {
                email: email,
            }
        });
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 8);
        const first_super_user = await prisma_1.default.user.findFirst({
            where: {
                role: client_1.RoleUser.SUPER_ADMIN
            }
        });
        if (first_super_user) {
            const user_create = await prisma_1.default.user.create({
                data: {
                    name: name,
                    slug_name: removerAcentos(name),
                    email: email,
                    image_user: image_user,
                    password: passwordHash,
                    role: role,
                    status: client_1.StatusUser.Disponivel
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
                message: "Usuário criado com sucesso",
                type: "user"
            }));
            await prisma_1.default.notificationUser.createMany({
                data: notificationsData
            });
            const infos_blog = await prisma_1.default.configurationBlog.findFirst();
            const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/criacao_de_employee.ejs`);
            const domain_site = process.env.URL_SITE;
            const domain_api = process.env.URL_API;
            const data = await ejs_1.default.renderFile(requiredPath, {
                name: user_create.name,
                name_blog: infos_blog?.name_blog,
                logo: infos_blog?.logo,
                domain_site: domain_site,
                domain_api: domain_api
            });
            await transporter.sendMail({
                from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,
                to: `${infos_blog?.email_blog}`,
                subject: `Novo usuario se cadastrando no CMS do ${infos_blog?.name_blog}`,
                html: data
            });
            if (send_email === true) {
                const infos_blog = await prisma_1.default.configurationBlog.findFirst();
                const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/data_login_user.ejs`);
                const domain_site = process.env.URL_SITE;
                const domain_api = process.env.URL_API;
                const data = await ejs_1.default.renderFile(requiredPath, {
                    name: user_create.name,
                    email: user_create.email,
                    password: password,
                    name_blog: infos_blog?.name_blog,
                    logo: infos_blog?.logo,
                    domain_site: domain_site,
                    domain_api: domain_api
                });
                await transporter.sendMail({
                    from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,
                    to: user_create.email,
                    subject: `Dados de acesso CMS do ${infos_blog?.name_blog}`,
                    html: data
                });
            }
            return user_create;
        }
        const user_create_super_admin = await prisma_1.default.user.create({
            data: {
                name: name,
                slug_name: removerAcentos(name),
                email: email,
                image_user: image_user,
                password: passwordHash,
                role: client_1.RoleUser.SUPER_ADMIN
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
        const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/criacao_de_super_administrador.ejs`);
        const domain_site = process.env.URL_SITE;
        const domain_api = process.env.URL_API;
        const data = await ejs_1.default.renderFile(requiredPath, {
            name: user_create_super_admin.name,
            logo: infos_blog?.logo,
            name_blog: infos_blog?.name_blog,
            domain_site: domain_site,
            domain_api: domain_api
        });
        await transporter.sendMail({
            from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,
            to: user_create_super_admin.email,
            subject: `Novo super administrador se cadastrando no CMS do ${infos_blog?.name_blog}`,
            html: data
        });
        return user_create_super_admin;
    }
}
exports.UserCreateService = UserCreateService;
//# sourceMappingURL=UserCreateService.js.map
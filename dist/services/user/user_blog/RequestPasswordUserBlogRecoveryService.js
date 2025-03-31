"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordUserBlogRecoveryService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv/config');
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
class RequestPasswordUserBlogRecoveryService {
    async execute({ email }) {
        const user = await prisma_1.default.userBlog.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            throw {
                error: { field: "email", message: "Conta não encontrada." },
                code: 400,
            };
        }
        const recovery = await prisma_1.default.passwordRecoveryUser.create({
            data: {
                email,
            },
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
        const requiredPath = path_1.default.join(__dirname, `../../emails_transacionais/recuperar_senha_user_blog.ejs`);
        const domain_site = process.env.URL_SITE;
        const domain_api = process.env.URL_API;
        const data = await ejs_1.default.renderFile(requiredPath, {
            name: user.name,
            id: recovery.id,
            logo: infos_blog?.logo,
            name_blog: infos_blog?.name_blog,
            domain_api: domain_api,
            domain_site: domain_site
        });
        await transporter.sendMail({
            from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,
            to: user.email,
            subject: "Recuperação de senha",
            html: data
        });
        return {
            message: "Verifique seu E-mail",
        };
    }
}
exports.RequestPasswordUserBlogRecoveryService = RequestPasswordUserBlogRecoveryService;
//# sourceMappingURL=RequestPasswordUserBlogRecoveryService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartMarketingPublicationScheduler = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma_1 = __importDefault(require("../../prisma"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const moment_1 = __importDefault(require("moment"));
const client_1 = require("@prisma/client");
class StartMarketingPublicationScheduler {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
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
    }
    async execute() {
        try {
            const now = new Date();
            // Busca publicações que precisam ser iniciadas e não estão em processamento
            const publications = await prisma_1.default.marketingPublication.findMany({
                where: {
                    status: "Programado",
                    publish_at_start: { lte: now },
                    is_processing: false,
                    is_completed: false, // Não processar se já finalizado
                    email_sent: false, // Apenas publicações sem email enviado
                },
            });
            for (const pub of publications) {
                // Atualiza status para evitar concorrência
                await prisma_1.default.marketingPublication.update({
                    where: { id: pub.id },
                    data: {
                        is_processing: true,
                        status: "Disponivel_programado",
                    },
                });
                try {
                    const start = (0, moment_1.default)(pub.publish_at_start).format('DD/MM/YYYY HH:mm');
                    const end = (0, moment_1.default)(pub.publish_at_end).format('DD/MM/YYYY HH:mm');
                    /* @ts-ignore */
                    await this.sendEmail(pub?.title, start, end);
                    console.log(`Iniciada publicidade: ${pub.title}`);
                }
                catch (emailError) {
                    console.error(`Erro ao enviar email para ${pub.title}:`, emailError);
                }
                // Finaliza processamento
                await prisma_1.default.marketingPublication.update({
                    where: { id: pub.id },
                    data: {
                        is_processing: false,
                    },
                });
            }
        }
        catch (error) {
            console.error("Erro ao iniciar publicações:", error);
        }
    }
    async sendEmail(title, start, end) {
        const domain_sitee = process.env.URL_SITE;
        const domain_apii = process.env.URL_API;
        const infos_blog = await prisma_1.default.configurationBlog.findFirst();
        const name_blog = infos_blog?.name_blog;
        const logo = infos_blog?.logo;
        const domain_site = domain_sitee;
        const domain_api = domain_apii;
        const emailTemplatePath = path_1.default.join(__dirname, "../emails_transacionais/publicidade_programada.ejs");
        const htmlContent = await ejs_1.default.renderFile(emailTemplatePath, { title, start, end, name_blog, logo, domain_site, domain_api });
        await this.transporter.sendMail({
            from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,
            to: `${infos_blog?.email_blog}`,
            subject: "Publicidade Programada Iniciada",
            html: htmlContent,
        });
        const users_superAdmins = await prisma_1.default.user.findMany({ where: { role: client_1.RoleUser.SUPER_ADMIN } });
        const users_admins = await prisma_1.default.user.findMany({ where: { role: client_1.RoleUser.ADMIN } });
        const all_user_ids = [
            ...users_superAdmins.map((user) => user.id),
            ...users_admins.map((user) => user.id),
        ];
        const notificationsData = all_user_ids.map((user_id) => ({
            user_id,
            message: `Publicidade programada "${title ? title : "Sem titulo"}" foi publicado no blog.`,
            type: "marketing",
        }));
        await prisma_1.default.notificationUser.createMany({ data: notificationsData });
    }
}
exports.StartMarketingPublicationScheduler = StartMarketingPublicationScheduler;
//# sourceMappingURL=StartMarketingPublicationScheduler.js.map
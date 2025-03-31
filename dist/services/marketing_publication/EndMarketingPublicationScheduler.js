"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndMarketingPublicationScheduler = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma_1 = __importDefault(require("../../prisma"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const moment_1 = __importDefault(require("moment"));
class EndMarketingPublicationScheduler {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP,
            },
        });
    }
    async execute() {
        try {
            const now = new Date();
            // Busca publicações que precisam ser encerradas e não estão em processamento
            const publications = await prisma_1.default.marketingPublication.findMany({
                where: {
                    status: "Disponivel_programado",
                    publish_at_end: { lte: now },
                    is_processing: false,
                    email_sent: false, // Apenas publicações sem email enviado
                },
            });
            for (const pub of publications) {
                // Atualiza status para evitar concorrência
                await prisma_1.default.marketingPublication.update({
                    where: { id: pub.id },
                    data: {
                        is_processing: true,
                        email_sent: true
                    },
                });
                try {
                    await prisma_1.default.marketingPublication.update({
                        where: { id: pub.id },
                        data: {
                            status: "Indisponivel",
                            is_completed: true,
                            is_processing: false,
                        },
                    });
                    const start = (0, moment_1.default)(pub.publish_at_start).format('DD/MM/YYYY HH:mm');
                    const end = (0, moment_1.default)(pub.publish_at_end).format('DD/MM/YYYY HH:mm');
                    /* @ts-ignore */
                    await this.sendEmail(pub.title, start, end);
                }
                catch (emailError) {
                    console.error(`Erro ao processar encerramento de ${pub.title}:`, emailError);
                }
            }
        }
        catch (error) { /* @ts-ignore */
            console.error("Erro ao encerrar publicações:", error.message);
            /* @ts-ignore */
            if (error.code === "P1001") {
                console.error("Erro de conexão com o banco de dados. Verifique o servidor.");
            }
        }
    }
    async sendEmail(title, start, end) {
        const domain_sites = process.env.URL_SITE;
        const domain_apii = process.env.URL_API;
        const infos_blog = await prisma_1.default.configurationBlog.findFirst();
        const name_blog = infos_blog?.name_blog;
        const logo = infos_blog?.logo;
        const domain_site = domain_sites;
        const domain_api = domain_apii;
        const emailTemplatePath = path_1.default.join(__dirname, "../emails_transacionais/encerrar_publicidade_programada.ejs");
        const htmlContent = await ejs_1.default.renderFile(emailTemplatePath, { title, start, end, name_blog, logo, domain_site, domain_api });
        await this.transporter.sendMail({
            from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,
            to: `${infos_blog?.email_blog}`,
            subject: "Publicidade Programada Encerrada",
            html: htmlContent,
        });
    }
}
exports.EndMarketingPublicationScheduler = EndMarketingPublicationScheduler;
//# sourceMappingURL=EndMarketingPublicationScheduler.js.map
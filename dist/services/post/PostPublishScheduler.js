"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostPublishScheduler = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma_1 = __importDefault(require("../../prisma"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const moment_1 = __importDefault(require("moment"));
class PostPublishScheduler {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            }
        });
    }
    async execute() {
        try {
            const now = new Date();
            const postsToPublish = await prisma_1.default.post.findMany({
                where: {
                    status: "Programado",
                    publish_at: { lte: now },
                },
            });
            if (postsToPublish.length > 0) {
                const postIds = postsToPublish.map((post) => post.id);
                // Atualiza os posts para "Disponível"
                await prisma_1.default.post.updateMany({
                    where: { id: { in: postIds } },
                    data: { status: "Disponivel" },
                });
                // Envia e-mails para cada post publicado
                for (const post of postsToPublish) { /* @ts-ignore */
                    await this.sendEmail(post.title, post.publish_at);
                }
            }
        }
        catch (error) {
            console.error("Erro ao publicar posts programados:", error);
        }
    }
    async sendEmail(postTitle, postPublish_at) {
        const domain_site = process.env.URL_SITE;
        const domain_api = process.env.URL_API;
        try {
            const infos_blog = await prisma_1.default.configurationBlog.findFirst();
            const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/post_programado.ejs`);
            const data = await ejs_1.default.renderFile(requiredPath, {
                title: postTitle,
                logo: infos_blog?.logo,
                name_blog: infos_blog?.name_blog,
                start: (0, moment_1.default)(postPublish_at).format('DD/MM/YYYY HH:mm'),
                domain_site: domain_site,
                domain_api: domain_api
            });
            await this.transporter.sendMail({
                from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,
                to: `${infos_blog?.email_blog}`,
                subject: `Post programado publicado no ${infos_blog?.name_blog}`,
                html: data
            });
        }
        catch (error) {
            console.error("Erro ao enviar e-mail:", error);
        }
    }
}
exports.PostPublishScheduler = PostPublishScheduler;
const scheduler = new PostPublishScheduler();
node_cron_1.default.schedule("*/1 * * * *", () => {
    scheduler.execute();
});
//# sourceMappingURL=PostPublishScheduler.js.map
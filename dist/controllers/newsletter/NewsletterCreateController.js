"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterCreateController = void 0;
const NewsletterCreateService_1 = require("../../services/newsletter/NewsletterCreateService");
class NewsletterCreateController {
    async handle(req, res) {
        const { email_user } = req.body;
        const create_news = new NewsletterCreateService_1.NewsletterCreateService();
        const news = await create_news.execute({
            email_user
        });
        return res.json(news);
    }
}
exports.NewsletterCreateController = NewsletterCreateController;
//# sourceMappingURL=NewsletterCreateController.js.map
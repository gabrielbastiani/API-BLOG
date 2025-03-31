"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterDeleteController = void 0;
const NewsletterDeleteService_1 = require("../../services/newsletter/NewsletterDeleteService");
class NewsletterDeleteController {
    async handle(req, res) {
        const { id_delete } = req.body;
        const news = new NewsletterDeleteService_1.NewsletterDeleteService();
        const latters = await news.execute({
            id_delete
        });
        return res.json(latters);
    }
}
exports.NewsletterDeleteController = NewsletterDeleteController;
//# sourceMappingURL=NewsletterDeleteController.js.map
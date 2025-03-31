"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterFindController = void 0;
const NewsletterFindService_1 = require("../../services/newsletter/NewsletterFindService");
class NewsletterFindController {
    async handle(req, res) {
        const { page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate } = req.query;
        const allnewslatter = new NewsletterFindService_1.NewsletterFindService();
        const newslatter = await allnewslatter.execute(Number(page), Number(limit), String(search), String(orderBy), orderDirection, startDate ? String(startDate) : undefined, endDate ? String(endDate) : undefined);
        return res.json(newslatter);
    }
}
exports.NewsletterFindController = NewsletterFindController;
//# sourceMappingURL=NewsletterFindController.js.map
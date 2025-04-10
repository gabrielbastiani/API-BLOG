"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitemapCategoryController = void 0;
const SitemapCategoryService_1 = require("../../services/category/SitemapCategoryService");
class SitemapCategoryController {
    async handle(req, res) {
        const sitemap = new SitemapCategoryService_1.SitemapCategoryService();
        const category = await sitemap.execute();
        return res.json(category);
    }
}
exports.SitemapCategoryController = SitemapCategoryController;
//# sourceMappingURL=SitemapCategoryController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitemapController = void 0;
const SitemapService_1 = require("../../services/post/SitemapService");
class SitemapController {
    async handle(req, res) {
        const post_content = new SitemapService_1.SitemapService();
        const post = await post_content.execute();
        return res.json(post);
    }
}
exports.SitemapController = SitemapController;
//# sourceMappingURL=SitemapController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllSeoBlogPageController = void 0;
const AllSeoBlogPageService_1 = require("../../../services/configuration_blog/seo/AllSeoBlogPageService");
class AllSeoBlogPageController {
    async handle(req, res) {
        const seo = new AllSeoBlogPageService_1.AllSeoBlogPageService();
        const blog = await seo.execute();
        return res.json(blog);
    }
}
exports.AllSeoBlogPageController = AllSeoBlogPageController;
//# sourceMappingURL=AllSeoBlogPageController.js.map
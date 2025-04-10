"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSeoBlogPageController = void 0;
const GetSeoBlogPageService_1 = require("../../../services/configuration_blog/seo/GetSeoBlogPageService");
class GetSeoBlogPageController {
    async handle(req, res) {
        const page = req.query.page;
        const seo = new GetSeoBlogPageService_1.GetSeoBlogPageService();
        const blog = await seo.execute({ page });
        return res.json(blog);
    }
}
exports.GetSeoBlogPageController = GetSeoBlogPageController;
//# sourceMappingURL=GetSeoBlogPageController.js.map
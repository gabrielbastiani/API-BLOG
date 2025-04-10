"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSeoUniqueController = void 0;
const GetSeoUniqueService_1 = require("../../../services/configuration_blog/seo/GetSeoUniqueService");
class GetSeoUniqueController {
    async handle(req, res) {
        const sEOSettings_id = req.query.sEOSettings_id;
        const seo = new GetSeoUniqueService_1.GetSeoUniqueService();
        const blog = await seo.execute({ sEOSettings_id });
        return res.json(blog);
    }
}
exports.GetSeoUniqueController = GetSeoUniqueController;
//# sourceMappingURL=GetSeoUniqueController.js.map
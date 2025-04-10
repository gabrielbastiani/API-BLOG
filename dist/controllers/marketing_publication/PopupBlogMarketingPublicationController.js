"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupBlogMarketingPublicationController = void 0;
const PopupBlogMarketingPublicationService_1 = require("../../services/marketing_publication/PopupBlogMarketingPublicationService");
class PopupBlogMarketingPublicationController {
    async handle(req, res) {
        const local = req.query.local;
        const position = req.query.position;
        const allPublication = new PopupBlogMarketingPublicationService_1.PopupBlogMarketingPublicationService();
        const publications = await allPublication.execute({ local, position });
        return res.json(publications);
    }
}
exports.PopupBlogMarketingPublicationController = PopupBlogMarketingPublicationController;
//# sourceMappingURL=PopupBlogMarketingPublicationController.js.map
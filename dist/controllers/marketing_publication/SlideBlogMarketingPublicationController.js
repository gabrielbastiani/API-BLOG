"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideBlogMarketingPublicationController = void 0;
const SlideBlogMarketingPublicationService_1 = require("../../services/marketing_publication/SlideBlogMarketingPublicationService");
class SlideBlogMarketingPublicationController {
    async handle(req, res) {
        const local = req.query.local;
        const position = req.query.position;
        const allPublication = new SlideBlogMarketingPublicationService_1.SlideBlogMarketingPublicationService();
        const publications = await allPublication.execute({ local, position });
        return res.json(publications);
    }
}
exports.SlideBlogMarketingPublicationController = SlideBlogMarketingPublicationController;
//# sourceMappingURL=SlideBlogMarketingPublicationController.js.map
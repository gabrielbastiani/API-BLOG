"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllMarketingPublicationController = void 0;
const AllMarketingPublicationService_1 = require("../../services/marketing_publication/AllMarketingPublicationService");
class AllMarketingPublicationController {
    async handle(req, res) {
        const { page = 1, marketing_publication_id, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate } = req.query;
        const allPublication = new AllMarketingPublicationService_1.AllMarketingPublicationService();
        const publications = await allPublication.execute(marketing_publication_id ? String(marketing_publication_id) : undefined, Number(page), Number(limit), String(search), String(orderBy), orderDirection, startDate ? String(startDate) : undefined, endDate ? String(endDate) : undefined);
        return res.json(publications);
    }
}
exports.AllMarketingPublicationController = AllMarketingPublicationController;
//# sourceMappingURL=AllMarketingPublicationController.js.map
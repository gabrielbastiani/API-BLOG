"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingPublicationDeleteDeleteController = void 0;
const MarketingPublicationDeleteService_1 = require("../../services/marketing_publication/MarketingPublicationDeleteService");
class MarketingPublicationDeleteDeleteController {
    async handle(req, res) {
        let { id_delete, name } = req.body;
        if (!Array.isArray(id_delete)) {
            id_delete = [id_delete];
        }
        const detail_publication = new MarketingPublicationDeleteService_1.MarketingPublicationDeleteService();
        const publications = await detail_publication.execute({ id_delete, name });
        return res.json(publications);
    }
}
exports.MarketingPublicationDeleteDeleteController = MarketingPublicationDeleteDeleteController;
//# sourceMappingURL=MarketingPublicationDeleteDeleteController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingDeleteImageController = void 0;
const MarketingDeleteImageService_1 = require("../../services/marketing_publication/MarketingDeleteImageService");
class MarketingDeleteImageController {
    async handle(req, res) {
        const marketingPublication_id = req.query.marketingPublication_id;
        const delete_image = new MarketingDeleteImageService_1.MarketingDeleteImageService();
        const publication = await delete_image.execute({ marketingPublication_id });
        return res.json(publication);
    }
}
exports.MarketingDeleteImageController = MarketingDeleteImageController;
//# sourceMappingURL=MarketingDeleteImageController.js.map
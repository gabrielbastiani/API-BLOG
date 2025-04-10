"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingUpdateDataController = void 0;
const MarketingUpdateDataService_1 = require("../../services/marketing_publication/MarketingUpdateDataService");
class MarketingUpdateDataController {
    async handle(req, res) {
        const { marketingPublication_id, title, description, status, redirect_url, text_button, publish_at_start, publish_at_end, position, conditions, popup_time, text_publication, local } = req.body;
        const update_publication = new MarketingUpdateDataService_1.MarketingUpdateDataService();
        let imageToUpdate = req.body.image_url;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }
        const publications = await update_publication.execute({
            marketingPublication_id,
            title,
            description,
            image_url: imageToUpdate,
            status,
            text_button,
            redirect_url,
            publish_at_start: publish_at_start ? new Date(publish_at_start) : undefined,
            publish_at_end: publish_at_end ? new Date(publish_at_end) : undefined,
            position,
            conditions,
            popup_time,
            text_publication,
            local
        });
        return res.json(publications);
    }
}
exports.MarketingUpdateDataController = MarketingUpdateDataController;
//# sourceMappingURL=MarketingUpdateDataController.js.map
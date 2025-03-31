"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteIntervalBannerController = void 0;
const DeleteIntervalBannerService_1 = require("../../services/marketing_publication/DeleteIntervalBannerService");
class DeleteIntervalBannerController {
    async handle(req, res) {
        const bannerInterval_id = req.query.bannerInterval_id;
        const createBannerService = new DeleteIntervalBannerService_1.DeleteIntervalBannerService();
        const marketing = await createBannerService.execute({ bannerInterval_id });
        return res.status(200).json(marketing);
    }
}
exports.DeleteIntervalBannerController = DeleteIntervalBannerController;
//# sourceMappingURL=DeleteIntervalBannerController.js.map
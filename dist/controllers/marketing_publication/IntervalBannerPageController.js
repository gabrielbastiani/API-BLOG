"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalBannerPageController = void 0;
const IntervalBannerPageService_1 = require("../../services/marketing_publication/IntervalBannerPageService");
class IntervalBannerPageController {
    async handle(req, res) {
        const local_site = req.query.local_site;
        const createBannerService = new IntervalBannerPageService_1.IntervalBannerPageService();
        const marketing = await createBannerService.execute({ local_site });
        return res.status(200).json(marketing);
    }
}
exports.IntervalBannerPageController = IntervalBannerPageController;
//# sourceMappingURL=IntervalBannerPageController.js.map
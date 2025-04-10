"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistingSlidesBannerPageController = void 0;
const ExistingSlidesBannerPageService_1 = require("../../services/marketing_publication/ExistingSlidesBannerPageService");
class ExistingSlidesBannerPageController {
    async handle(req, res) {
        const local = req.query.local;
        const createBannerService = new ExistingSlidesBannerPageService_1.ExistingSlidesBannerPageService();
        const marketing = await createBannerService.execute({ local });
        return res.status(200).json(marketing);
    }
}
exports.ExistingSlidesBannerPageController = ExistingSlidesBannerPageController;
//# sourceMappingURL=ExistingSlidesBannerPageController.js.map
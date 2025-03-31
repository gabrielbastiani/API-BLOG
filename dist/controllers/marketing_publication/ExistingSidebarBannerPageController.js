"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistingSidebarBannerPageController = void 0;
const ExistingSidebarBannerPageService_1 = require("../../services/marketing_publication/ExistingSidebarBannerPageService");
class ExistingSidebarBannerPageController {
    async handle(req, res) {
        const local = req.query.local;
        const createBannerService = new ExistingSidebarBannerPageService_1.ExistingSidebarBannerPageService();
        const marketing = await createBannerService.execute({ local });
        return res.status(200).json(marketing);
    }
}
exports.ExistingSidebarBannerPageController = ExistingSidebarBannerPageController;
//# sourceMappingURL=ExistingSidebarBannerPageController.js.map
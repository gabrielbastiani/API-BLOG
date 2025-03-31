"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistingIntervalBannerController = void 0;
const ExistingIntervalBannerService_1 = require("../../services/marketing_publication/ExistingIntervalBannerService");
class ExistingIntervalBannerController {
    async handle(req, res) {
        const createBannerService = new ExistingIntervalBannerService_1.ExistingIntervalBannerService();
        const marketing = await createBannerService.execute();
        return res.status(200).json(marketing);
    }
}
exports.ExistingIntervalBannerController = ExistingIntervalBannerController;
//# sourceMappingURL=ExistingIntervalBannerController.js.map
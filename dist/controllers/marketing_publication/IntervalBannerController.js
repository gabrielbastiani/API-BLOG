"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalBannerController = void 0;
const IntervalBannerService_1 = require("../../services/marketing_publication/IntervalBannerService");
class IntervalBannerController {
    async handle(req, res) {
        const { local_site, interval_banner, label_local_site, label_interval_banner } = req.body;
        const createBannerService = new IntervalBannerService_1.IntervalBannerService();
        const interval = interval_banner && !isNaN(Number(interval_banner)) ? Number(interval_banner) : undefined;
        const marketing = await createBannerService.execute({
            local_site, /* @ts-ignore */
            interval_banner: interval,
            label_interval_banner,
            label_local_site
        });
        return res.status(200).json(marketing);
    }
}
exports.IntervalBannerController = IntervalBannerController;
//# sourceMappingURL=IntervalBannerController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalUpdateDataController = void 0;
const IntervalUpdateDataService_1 = require("../../services/marketing_publication/IntervalUpdateDataService");
class IntervalUpdateDataController {
    async handle(req, res) {
        const bannerInterval_id = req.query.bannerInterval_id;
        const { local_site, label_local_site, interval_banner, label_interval_banner } = req.body;
        const update_interval = new IntervalUpdateDataService_1.IntervalUpdateDataService();
        const interval = interval_banner && !isNaN(Number(interval_banner)) ? Number(interval_banner) : undefined;
        const intervals = await update_interval.execute({
            bannerInterval_id,
            local_site,
            label_local_site,
            interval_banner: interval,
            label_interval_banner
        });
        return res.json(intervals);
    }
}
exports.IntervalUpdateDataController = IntervalUpdateDataController;
//# sourceMappingURL=IntervalUpdateDataController.js.map
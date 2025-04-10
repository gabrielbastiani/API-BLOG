"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalUpdateDataService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class IntervalUpdateDataService {
    async execute({ bannerInterval_id, local_site, label_local_site, interval_banner, label_interval_banner }) {
        const dataToUpdate = {};
        if (local_site) {
            dataToUpdate.local_site = local_site;
            dataToUpdate.label_local_site = label_local_site;
        }
        if (interval_banner) {
            dataToUpdate.interval_banner = interval_banner && !isNaN(Number(interval_banner)) ? Number(interval_banner) : undefined;
            dataToUpdate.label_interval_banner = label_interval_banner;
        }
        const update_interval = await prisma_1.default.bannerInterval.update({
            where: {
                id: bannerInterval_id
            },
            data: dataToUpdate
        });
        return update_interval;
    }
}
exports.IntervalUpdateDataService = IntervalUpdateDataService;
//# sourceMappingURL=IntervalUpdateDataService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalBannerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class IntervalBannerService {
    async execute({ interval_banner, local_site, label_local_site, label_interval_banner }) {
        const bannerInterval = await prisma_1.default.bannerInterval.create({
            data: {
                interval_banner: interval_banner && !isNaN(Number(interval_banner)) ? Number(interval_banner) : undefined,
                local_site: local_site,
                label_local_site: label_local_site,
                label_interval_banner: label_interval_banner
            },
        });
        return bannerInterval;
    }
}
exports.IntervalBannerService = IntervalBannerService;
//# sourceMappingURL=IntervalBannerService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalBannerPageService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class IntervalBannerPageService {
    async execute({ local_site }) {
        const bannerInterval = await prisma_1.default.bannerInterval.findFirst({
            where: {
                local_site: local_site
            }
        });
        return bannerInterval;
    }
}
exports.IntervalBannerPageService = IntervalBannerPageService;
//# sourceMappingURL=IntervalBannerPageService.js.map
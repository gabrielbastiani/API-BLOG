"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistingIntervalBannerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ExistingIntervalBannerService {
    async execute() {
        const bannerInterval = await prisma_1.default.bannerInterval.findMany();
        return bannerInterval;
    }
}
exports.ExistingIntervalBannerService = ExistingIntervalBannerService;
//# sourceMappingURL=ExistingIntervalBannerService.js.map
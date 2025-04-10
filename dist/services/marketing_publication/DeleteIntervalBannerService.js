"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteIntervalBannerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteIntervalBannerService {
    async execute({ bannerInterval_id }) {
        const bannerInterval = await prisma_1.default.bannerInterval.delete({
            where: {
                id: bannerInterval_id
            }
        });
        return bannerInterval;
    }
}
exports.DeleteIntervalBannerService = DeleteIntervalBannerService;
//# sourceMappingURL=DeleteIntervalBannerService.js.map
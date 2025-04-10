"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistingSlidesBannerPageService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class ExistingSlidesBannerPageService {
    async execute({ local }) {
        const bannerInterval = await prisma_1.default.marketingPublication.findMany({
            where: {
                local: local,
                position: client_1.Position.SLIDER,
                OR: [
                    { status: client_1.StatusMarketingPublication.Disponivel },
                    { status: client_1.StatusMarketingPublication.Disponivel_programado }
                ]
            }
        });
        return bannerInterval;
    }
}
exports.ExistingSlidesBannerPageService = ExistingSlidesBannerPageService;
//# sourceMappingURL=ExistingSlidesBannerPageService.js.map
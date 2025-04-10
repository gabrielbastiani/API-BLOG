"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideBlogMarketingPublicationService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class SlideBlogMarketingPublicationService {
    async execute({ local, position }) {
        const publications_blog_slides = await prisma_1.default.marketingPublication.findMany({
            where: {
                local: local,
                position: position = position,
                OR: [
                    { status: client_1.StatusMarketingPublication.Disponivel },
                    { status: client_1.StatusMarketingPublication.Disponivel_programado }
                ]
            }
        });
        return publications_blog_slides;
    }
}
exports.SlideBlogMarketingPublicationService = SlideBlogMarketingPublicationService;
//# sourceMappingURL=SlideBlogMarketingPublicationService.js.map
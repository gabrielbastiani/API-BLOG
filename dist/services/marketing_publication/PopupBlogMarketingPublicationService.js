"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupBlogMarketingPublicationService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class PopupBlogMarketingPublicationService {
    async execute({ local, position }) {
        const publications_blog_popup = await prisma_1.default.marketingPublication.findFirst({
            where: {
                local: local,
                position: position = position,
                OR: [
                    { status: client_1.StatusMarketingPublication.Disponivel },
                    { status: client_1.StatusMarketingPublication.Disponivel_programado }
                ]
            }
        });
        return publications_blog_popup;
    }
}
exports.PopupBlogMarketingPublicationService = PopupBlogMarketingPublicationService;
//# sourceMappingURL=PopupBlogMarketingPublicationService.js.map
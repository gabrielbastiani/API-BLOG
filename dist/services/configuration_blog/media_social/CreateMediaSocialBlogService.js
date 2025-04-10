"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMediaSocialBlogService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class CreateMediaSocialBlogService {
    async execute({ name_media, link, logo_media }) {
        const config = await prisma_1.default.socialMediasBlog.create({
            data: {
                name_media: name_media,
                link: link,
                logo_media: logo_media
            }
        });
        return config;
    }
}
exports.CreateMediaSocialBlogService = CreateMediaSocialBlogService;
//# sourceMappingURL=CreateMediaSocialBlogService.js.map
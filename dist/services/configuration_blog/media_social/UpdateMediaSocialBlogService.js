"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMediaSocialBlogService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class UpdateMediaSocialBlogService {
    async execute({ socialMediasBlog_id, name_media, link, logo_media }) {
        const mediasSocial = await prisma_1.default.socialMediasBlog.findUnique({
            where: { id: socialMediasBlog_id }
        });
        const dataToUpdate = {};
        if (name_media) {
            dataToUpdate.name_media = name_media;
        }
        if (link) {
            dataToUpdate.link = link;
        }
        if (logo_media) {
            if (mediasSocial?.logo_media) {
                const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + mediasSocial?.logo_media);
                console.log(`Deleting image: ${imagePath}`);
                fs_1.default.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old image: ${err.message}`);
                    }
                    else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            dataToUpdate.logo_media = logo_media;
        }
        const update_Configs = await prisma_1.default.socialMediasBlog.update({
            where: {
                id: socialMediasBlog_id
            },
            data: dataToUpdate
        });
        return update_Configs;
    }
}
exports.UpdateMediaSocialBlogService = UpdateMediaSocialBlogService;
//# sourceMappingURL=UpdateMediaSocialBlogService.js.map
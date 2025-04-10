"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMediaSocialBlogController = void 0;
const UpdateMediaSocialBlogService_1 = require("../../../services/configuration_blog/media_social/UpdateMediaSocialBlogService");
class UpdateMediaSocialBlogController {
    async handle(req, res) {
        const { socialMediasBlog_id, name_media, link } = req.body;
        const update_configs = new UpdateMediaSocialBlogService_1.UpdateMediaSocialBlogService();
        let imageToUpdate = req.body.logo_media;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }
        const configs = await update_configs.execute({
            socialMediasBlog_id,
            name_media,
            link,
            logo_media: imageToUpdate
        });
        return res.json(configs);
    }
}
exports.UpdateMediaSocialBlogController = UpdateMediaSocialBlogController;
//# sourceMappingURL=UpdateMediaSocialBlogController.js.map
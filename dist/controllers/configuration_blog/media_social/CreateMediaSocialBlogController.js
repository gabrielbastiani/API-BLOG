"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMediaSocialBlogController = void 0;
const CreateMediaSocialBlogService_1 = require("../../../services/configuration_blog/media_social/CreateMediaSocialBlogService");
class CreateMediaSocialBlogController {
    async handle(req, res) {
        const { name_media, link, logo_media } = req.body;
        const create_configuration = new CreateMediaSocialBlogService_1.CreateMediaSocialBlogService();
        let imageToUpdate = logo_media;
        if (!logo_media && req.file) {
            imageToUpdate = req.file.filename;
        }
        const configuration = await create_configuration.execute({
            name_media,
            link,
            logo_media: imageToUpdate
        });
        return res.json(configuration);
    }
}
exports.CreateMediaSocialBlogController = CreateMediaSocialBlogController;
//# sourceMappingURL=CreateMediaSocialBlogController.js.map
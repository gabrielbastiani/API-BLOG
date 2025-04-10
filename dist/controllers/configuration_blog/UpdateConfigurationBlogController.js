"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfigurationBlogController = void 0;
const UpdateConfigurationBlogService_1 = require("../../services/configuration_blog/UpdateConfigurationBlogService");
class UpdateConfigurationBlogController {
    async handle(req, res) {
        const { configurationBlog_id, name_blog, description_blog, phone, email_blog, author_blog, about_author_blog, privacy_policies } = req.body;
        let imageToUpdate = req.body.logo;
        let imageToUpdatefavicon = req.body.favicon;
        const update_configs = new UpdateConfigurationBlogService_1.UpdateConfigurationBlogService();
        if (req.files) { /* @ts-ignore */
            if (req.files['logo']) { /* @ts-ignore */
                imageToUpdate = req.files['logo'][0].filename;
            } /* @ts-ignore */
            if (req.files['favicon']) { /* @ts-ignore */
                imageToUpdatefavicon = req.files['favicon'][0].filename;
            }
        }
        const configs = await update_configs.execute({
            configurationBlog_id,
            name_blog,
            description_blog,
            logo: imageToUpdate,
            favicon: imageToUpdatefavicon,
            phone,
            email_blog,
            author_blog,
            about_author_blog,
            privacy_policies
        });
        return res.json(configs);
    }
}
exports.UpdateConfigurationBlogController = UpdateConfigurationBlogController;
//# sourceMappingURL=UpdateConfigurationBlogController.js.map
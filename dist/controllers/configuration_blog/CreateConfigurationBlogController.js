"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConfigurationBlogController = void 0;
const CreateConfigurationBlogService_1 = require("../../services/configuration_blog/CreateConfigurationBlogService");
class CreateConfigurationBlogController {
    async handle(req, res) {
        const { name_blog, email_blog, logo, favicon } = req.body;
        let imageToUpdate = logo;
        let imageFavicon = favicon;
        const create_configuration = new CreateConfigurationBlogService_1.CreateConfigurationBlogService();
        if (req.files) { /* @ts-ignore */
            if (req.files['logo']) { /* @ts-ignore */
                imageToUpdate = req.files['logo'][0].filename;
            } /* @ts-ignore */
            if (req.files['favicon']) { /* @ts-ignore */
                imageFavicon = req.files['favicon'][0].filename;
            }
        }
        const configuration = await create_configuration.execute({
            name_blog,
            logo: imageToUpdate,
            favicon: imageFavicon,
            email_blog
        });
        return res.json(configuration);
    }
}
exports.CreateConfigurationBlogController = CreateConfigurationBlogController;
//# sourceMappingURL=CreateConfigurationBlogController.js.map
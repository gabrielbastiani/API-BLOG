"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSeoBlogController = void 0;
const CreateSeoBlogService_1 = require("../../../services/configuration_blog/seo/CreateSeoBlogService");
class CreateSeoBlogController {
    async handle(req, res) {
        const { page, title, description, keywords, ogTitle, ogDescription, ogImageWidth, ogImageHeight, ogImageAlt, twitterTitle, twitterDescription, twitterCreator } = req.body;
        // Processar imagens do OG
        let ogImagescreate = [];
        if (req.files && 'ogImages' in req.files) {
            ogImagescreate = req.files['ogImages'].map((file) => file.filename);
        }
        // Processar imagens do Twitter
        let imagesTwitter = [];
        if (req.files && 'twitterImages' in req.files) {
            imagesTwitter = req.files['twitterImages'].map((file) => file.filename);
        }
        const create_seo = new CreateSeoBlogService_1.CreateSeoBlogService();
        const seo = await create_seo.execute({
            page,
            title,
            description,
            keywords: keywords ? JSON.parse(keywords) : [], // Assume que keywords é enviado como JSON string
            ogTitle,
            ogDescription,
            ogImages: ogImagescreate,
            ogImageWidth: ogImageWidth ? Number(ogImageWidth) : undefined,
            ogImageHeight: ogImageHeight ? Number(ogImageHeight) : undefined,
            ogImageAlt,
            twitterTitle,
            twitterDescription,
            twitterCreator,
            twitterImages: imagesTwitter
        });
        return res.json(seo);
    }
}
exports.CreateSeoBlogController = CreateSeoBlogController;
//# sourceMappingURL=CreateSeoBlogController.js.map
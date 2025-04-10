"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCreateController = void 0;
const PostCreateService_1 = require("../../services/post/PostCreateService");
class PostCreateController {
    async handle(req, res) {
        try {
            const { author, title, text_post, publish_at, status, seo_description, custom_url } = req.body;
            const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
            const categories = req.body.categories ? JSON.parse(req.body.categories) : [];
            const seo_keywords = req.body.seo_keywords ? JSON.parse(req.body.seo_keywords) : [];
            let imageToUpdate = req.body.image_post;
            if (!req.body.image_post && req.file) {
                imageToUpdate = req.file.filename;
            }
            const create_post = new PostCreateService_1.PostCreateService();
            const post = await create_post.execute({
                author,
                title,
                text_post,
                image_post: imageToUpdate,
                status: status || "Indisponivel",
                publish_at: publish_at ? new Date(publish_at) : undefined,
                tags,
                categories,
                seo_description,
                seo_keywords,
                custom_url
            });
            return res.status(201).json(post);
        }
        catch (error) {
            console.error(error); /* @ts-ignore */
            return res.status(400).json({ error: error.message || "Erro ao criar o post" });
        }
    }
}
exports.PostCreateController = PostCreateController;
//# sourceMappingURL=PostCreateController.js.map
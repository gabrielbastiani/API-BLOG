"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUpdateDataController = void 0;
const PostUpdateDataService_1 = require("../../services/post/PostUpdateDataService");
class PostUpdateDataController {
    async handle(req, res) {
        const { post_id, author, title, text_post, status, publish_at, categories, tags, seo_description, seo_keywords, custom_url } = req.body;
        const updatePostService = new PostUpdateDataService_1.PostUpdateDataService();
        let imageToUpdate = req.body.image_post;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }
        try {
            const post = await updatePostService.execute({
                post_id,
                author,
                title,
                image_post: imageToUpdate,
                status,
                text_post,
                publish_at,
                categories: categories ? JSON.parse(categories) : undefined,
                tags: tags ? JSON.parse(tags) : undefined,
                seo_description,
                seo_keywords: seo_keywords ? JSON.parse(seo_keywords) : undefined,
                custom_url
            });
            return res.json(post);
        }
        catch (error) { /* @ts-ignore */
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.PostUpdateDataController = PostUpdateDataController;
//# sourceMappingURL=PostUpdateDataController.js.map
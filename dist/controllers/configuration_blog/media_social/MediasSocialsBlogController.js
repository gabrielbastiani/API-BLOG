"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediasSocialsBlogController = void 0;
const MediasSocialsBlogService_1 = require("../../../services/configuration_blog/media_social/MediasSocialsBlogService");
class MediasSocialsBlogController {
    async handle(req, res) {
        const configs = new MediasSocialsBlogService_1.MediasSocialsBlogService();
        const blog = await configs.execute();
        return res.json(blog);
    }
}
exports.MediasSocialsBlogController = MediasSocialsBlogController;
//# sourceMappingURL=MediasSocialsBlogController.js.map
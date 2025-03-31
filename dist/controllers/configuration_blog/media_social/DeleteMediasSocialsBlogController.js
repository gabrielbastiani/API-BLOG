"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMediasSocialsBlogController = void 0;
const DeleteMediasSocialsBlogService_1 = require("../../../services/configuration_blog/media_social/DeleteMediasSocialsBlogService");
class DeleteMediasSocialsBlogController {
    async handle(req, res) {
        const socialMediasBlog_id = req.query.socialMediasBlog_id;
        const configs = new DeleteMediasSocialsBlogService_1.DeleteMediasSocialsBlogService();
        const blog = await configs.execute({ socialMediasBlog_id });
        return res.json(blog);
    }
}
exports.DeleteMediasSocialsBlogController = DeleteMediasSocialsBlogController;
//# sourceMappingURL=DeleteMediasSocialsBlogController.js.map
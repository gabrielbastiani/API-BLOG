"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDeleteController = void 0;
const PostDeleteService_1 = require("../../services/post/PostDeleteService");
class PostDeleteController {
    async handle(req, res) {
        let { id_delete, name } = req.body;
        if (!Array.isArray(id_delete)) {
            id_delete = [id_delete];
        }
        const post_delete = new PostDeleteService_1.PostDeleteService();
        const post = await post_delete.execute({ id_delete, name });
        return res.json(post);
    }
}
exports.PostDeleteController = PostDeleteController;
//# sourceMappingURL=PostDeleteController.js.map
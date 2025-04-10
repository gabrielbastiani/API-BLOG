"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentCreateController = void 0;
const CommentCreateService_1 = require("../../services/comment/CommentCreateService");
class CommentCreateController {
    async handle(req, res) {
        try {
            const { post_id, userBlog_id, name_user, image_user, comment, parentId } = req.body;
            const create_comment = new CommentCreateService_1.CommentCreateService();
            let imageToUpdate = image_user;
            if (!image_user && req.file) {
                imageToUpdate = req.file.filename;
            }
            const comments = await create_comment.execute({
                post_id,
                userBlog_id,
                name_user,
                image_user: imageToUpdate,
                comment,
                parentId
            });
            return res.status(201).json(comments);
        }
        catch (error) { /* @ts-ignore */
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.CommentCreateController = CommentCreateController;
//# sourceMappingURL=CommentCreateController.js.map
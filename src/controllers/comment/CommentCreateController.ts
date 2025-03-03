import { Request, Response } from 'express';
import { CommentCreateService } from '../../services/comment/CommentCreateService';

class CommentCreateController {
    async handle(req: Request, res: Response) {
        try {
            const {
                post_id,
                userBlog_id,
                name_user,
                image_user,
                comment,
                parentId
            } = req.body;

            const create_comment = new CommentCreateService();

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

        } catch (error) {/* @ts-ignore */
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CommentCreateController }
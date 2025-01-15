import { Request, Response } from "express";
import { CommentAllPostService } from "../../services/comment/CommentAllPostService";

class CommentAllPostController {
    async handle(req: Request, res: Response) {
        const post_id = req.query.post_id as string;

        const allComment = new CommentAllPostService();
        const commentes = await allComment.execute({ post_id });

        return res.json(commentes);
    }
}

export { CommentAllPostController };
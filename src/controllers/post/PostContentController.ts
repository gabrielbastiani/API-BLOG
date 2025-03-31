import { Request, Response } from "express";
import { PostContentService } from "../../services/post/PostContentService";

class PostContentController {
    async handle(req: Request, res: Response) {
        const url_post = req.query.url_post as string;

        const post_content = new PostContentService();
        const post = await post_content.execute({ url_post });

        return res.json(post);
    }
}

export { PostContentController };
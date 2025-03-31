import { Request, Response } from "express";
import { PostSEOContentService } from "../../services/post/PostSEOContentService";

class PostSEOContentController {
    async handle(req: Request, res: Response) {

        const post_content = new PostSEOContentService();
        const post = await post_content.execute();

        return res.json(post);
    }
}

export { PostSEOContentController };
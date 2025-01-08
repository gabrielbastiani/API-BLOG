import { Request, Response } from "express";
import { SearchBlogPostService } from "../../services/post/SearchBlogPostService";

class SearchBlogPostController {
    async handle(req: Request, res: Response) {
        const {
            search = ""
        } = req.query;

        const allPosts = new SearchBlogPostService();
        const posts = await allPosts.execute(
            String(search)
        );

        return res.json(posts);
    }
}

export { SearchBlogPostController };
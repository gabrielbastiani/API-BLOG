import { Request, Response } from "express";
import { NavBarSearchBlogPostService } from "../../services/post/NavBarSearchBlogPostService";

class NavBarSearchBlogPostController {
    async handle(req: Request, res: Response) {
        const {
            search = ""
        } = req.query;

        const allPosts = new NavBarSearchBlogPostService();
        const posts = await allPosts.execute(
            String(search)
        );

        return res.json(posts);
    }
}

export { NavBarSearchBlogPostController };
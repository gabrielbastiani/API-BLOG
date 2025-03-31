import { Request, Response } from "express";
import { SitemapService } from "../../services/post/SitemapService";

class SitemapController {
    async handle(req: Request, res: Response) {

        const post_content = new SitemapService();
        const post = await post_content.execute();

        return res.json(post);
    }
}

export { SitemapController };
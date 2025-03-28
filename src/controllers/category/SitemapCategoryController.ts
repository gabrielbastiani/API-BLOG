import { Request, Response } from 'express'
import { SitemapCategoryService } from '../../services/category/SitemapCategoryService'; 

class SitemapCategoryController {
    async handle(req: Request, res: Response) {

        const sitemap = new SitemapCategoryService();

        const category = await sitemap.execute();

        return res.json(category);

    }
}

export { SitemapCategoryController }
import { Request, Response } from 'express'
import { GetSeoBlogPageService } from '../../../services/configuration_blog/seo/GetSeoBlogPageService'; 

class GetSeoBlogPageController {
    async handle(req: Request, res: Response) {

        const page = req.query.page as string;

        const seo = new GetSeoBlogPageService();

        const blog = await seo.execute({ page });

        return res.json(blog);

    }
}

export { GetSeoBlogPageController }
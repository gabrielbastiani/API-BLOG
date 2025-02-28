import { Request, Response } from 'express'
import { AllSeoBlogPageService } from '../../../services/configuration_blog/seo/AllSeoBlogPageService'; 

class AllSeoBlogPageController {
    async handle(req: Request, res: Response) {

        const seo = new AllSeoBlogPageService();

        const blog = await seo.execute();

        return res.json(blog);

    }
}

export { AllSeoBlogPageController }
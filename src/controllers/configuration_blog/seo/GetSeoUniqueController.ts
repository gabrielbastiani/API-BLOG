import { Request, Response } from 'express'
import { GetSeoUniqueService } from '../../../services/configuration_blog/seo/GetSeoUniqueService'; 

class GetSeoUniqueController {
    async handle(req: Request, res: Response) {

        const sEOSettings_id = req.query.sEOSettings_id as string;

        const seo = new GetSeoUniqueService();

        const blog = await seo.execute({ sEOSettings_id });

        return res.json(blog);

    }
}

export { GetSeoUniqueController }
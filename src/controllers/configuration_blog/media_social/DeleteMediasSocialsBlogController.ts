import { Request, Response } from 'express'
import { DeleteMediasSocialsBlogService } from '../../../services/configuration_blog/media_social/DeleteMediasSocialsBlogService'; 

class DeleteMediasSocialsBlogController {
    async handle(req: Request, res: Response) {

        const socialMediasBlog_id = req.query.socialMediasBlog_id as string;

        const configs = new DeleteMediasSocialsBlogService();

        const blog = await configs.execute({ socialMediasBlog_id });

        return res.json(blog);

    }
}

export { DeleteMediasSocialsBlogController }
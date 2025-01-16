import { Request, Response } from 'express'
import { MediasSocialsBlogService } from '../../../services/configuration_blog/media_social/MediasSocialsBlogService'; 

class MediasSocialsBlogController {
    async handle(req: Request, res: Response) {

        const configs = new MediasSocialsBlogService();

        const blog = await configs.execute();

        return res.json(blog);

    }
}

export { MediasSocialsBlogController }
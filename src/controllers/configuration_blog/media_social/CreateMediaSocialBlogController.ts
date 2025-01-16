import { Request, Response } from 'express';
import { CreateMediaSocialBlogService } from '../../../services/configuration_blog/media_social/CreateMediaSocialBlogService';

class CreateMediaSocialBlogController {
    async handle(req: Request, res: Response) {
        const {
            name_media, link, logo_media
        } = req.body;

        const create_configuration = new CreateMediaSocialBlogService();

        let imageToUpdate = logo_media;
        if (!logo_media && req.file) {
            imageToUpdate = req.file.filename;
        }

        const configuration = await create_configuration.execute({
            name_media,
            link,
            logo_media: imageToUpdate
        });

        return res.json(configuration);
    }
}

export { CreateMediaSocialBlogController };
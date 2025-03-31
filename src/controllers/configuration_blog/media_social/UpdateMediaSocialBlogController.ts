import { Request, Response } from 'express';
import { UpdateMediaSocialBlogService } from '../../../services/configuration_blog/media_social/UpdateMediaSocialBlogService'; 

class UpdateMediaSocialBlogController {
    async handle(req: Request, res: Response) {

        const {
            socialMediasBlog_id,
            name_media,
            link
        } = req.body;

        const update_configs = new UpdateMediaSocialBlogService();

        let imageToUpdate = req.body.logo_media;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }

        const configs = await update_configs.execute({
            socialMediasBlog_id,
            name_media,
            link,
            logo_media: imageToUpdate
        });

        return res.json(configs);
    }
}

export { UpdateMediaSocialBlogController };
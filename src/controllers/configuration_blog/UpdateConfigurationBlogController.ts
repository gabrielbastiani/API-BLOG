import { Request, Response } from 'express';
import { UpdateConfigurationBlogService } from '../../services/configuration_blog/UpdateConfigurationBlogService';

class UpdateConfigurationBlogController {
    async handle(req: Request, res: Response) {

        const {
            configurationBlog_id,
            name_blog,
            description_blog,
            phone,
            email_blog,
            author_blog,
            about_author_blog
        } = req.body;

        const update_configs = new UpdateConfigurationBlogService();

        let imageToUpdate = req.body.logo;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }

        const configs = await update_configs.execute({
            configurationBlog_id,
            name_blog,
            description_blog,
            logo: imageToUpdate,
            phone,
            email_blog,
            author_blog,
            about_author_blog
        });

        return res.json(configs);
    }
}

export { UpdateConfigurationBlogController };
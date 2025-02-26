import { Request, Response } from 'express';
import { CreateConfigurationBlogService } from '../../services/configuration_blog/CreateConfigurationBlogService'; 

class CreateConfigurationBlogController {
    async handle(req: Request, res: Response) {
        const {
            name_blog, email_blog, logo, favicon
        } = req.body;

        const create_configuration = new CreateConfigurationBlogService();

        let imageToUpdate = logo;
        if (!logo && req.file) {
            imageToUpdate = req.file.filename;
        }

        let imageFavicon = favicon;
        if (!favicon && req.file) {
            imageFavicon = req.file.filename;
        }

        const configuration = await create_configuration.execute({
            name_blog,
            logo: imageToUpdate,
            favicon: imageFavicon,
            email_blog
        });

        return res.json(configuration);
    }
}

export { CreateConfigurationBlogController };
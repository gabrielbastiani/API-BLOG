import { Request, Response } from 'express';
import { CreateConfigurationBlogService } from '../../services/configuration_blog/CreateConfigurationBlogService'; 

class CreateConfigurationBlogController {
    async handle(req: Request, res: Response) {
        const {
            name_blog, email_blog, logo, favicon
        } = req.body;

        let imageToUpdate = logo;
        let imageFavicon = favicon;

        const create_configuration = new CreateConfigurationBlogService();

        if (req.files) {/* @ts-ignore */
            if (req.files['logo']) {/* @ts-ignore */
                imageToUpdate = req.files['logo'][0].filename;
            }/* @ts-ignore */
            if (req.files['favicon']) {/* @ts-ignore */
                imageFavicon = req.files['favicon'][0].filename;
            }
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
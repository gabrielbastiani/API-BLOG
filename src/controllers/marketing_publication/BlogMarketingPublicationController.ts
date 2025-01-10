import { Request, Response } from "express";
import { BlogMarketingPublicationService } from "../../services/marketing_publication/BlogMarketingPublicationService"; 

class BlogMarketingPublicationController {
    async handle(req: Request, res: Response) {

        const allPublication = new BlogMarketingPublicationService();
        const publications = await allPublication.execute();

        return res.json(publications);
    }
}

export { BlogMarketingPublicationController };
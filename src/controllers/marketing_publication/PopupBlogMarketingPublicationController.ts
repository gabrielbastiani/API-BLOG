import { Request, Response } from "express";
import { PopupBlogMarketingPublicationService } from "../../services/marketing_publication/PopupBlogMarketingPublicationService"; 

class PopupBlogMarketingPublicationController {
    async handle(req: Request, res: Response) {

        const local = req.query.local as string;
        const position = req.query.position as string;

        const allPublication = new PopupBlogMarketingPublicationService();
        
        const publications = await allPublication.execute({ local, position });

        return res.json(publications);
    }
}

export { PopupBlogMarketingPublicationController };
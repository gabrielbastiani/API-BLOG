import { Request, Response } from "express";
import { SlideBlogMarketingPublicationService } from "../../services/marketing_publication/SlideBlogMarketingPublicationService"; 

class SlideBlogMarketingPublicationController {
    async handle(req: Request, res: Response) {

        const local = req.query.local as string;
        const position = req.query.position as string;

        const allPublication = new SlideBlogMarketingPublicationService();
        
        const publications = await allPublication.execute({ local, position });

        return res.json(publications);
    }
}

export { SlideBlogMarketingPublicationController };
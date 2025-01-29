import { Request, Response } from "express";
import { ExistingSlidesBannerPageService } from "../../services/marketing_publication/ExistingSlidesBannerPageService";

class ExistingSlidesBannerPageController {
    async handle(req: Request, res: Response) {

        const local = req.query.local as string;

        const createBannerService = new ExistingSlidesBannerPageService();

        const marketing = await createBannerService.execute({ local });

        return res.status(200).json(marketing);
    }
}

export { ExistingSlidesBannerPageController };
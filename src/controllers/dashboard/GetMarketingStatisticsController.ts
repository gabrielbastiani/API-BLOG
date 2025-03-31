import { Request, Response } from "express";
import { GetMarketingStatisticsService } from "../../services/dashboard/GetMarketingStatisticsService";

class GetMarketingStatisticsController {
    async handle(req: Request, res: Response) {
        const service = new GetMarketingStatisticsService();
        const data = await service.execute();
        return res.json(data);
    }
}

export { GetMarketingStatisticsController };
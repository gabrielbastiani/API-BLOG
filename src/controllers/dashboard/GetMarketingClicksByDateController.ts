import { Request, Response } from "express";
import { GetMarketingClicksByDateService } from "../../services/dashboard/GetMarketingClicksByDateService";

class GetMarketingClicksByDateController {
    async handle(req: Request, res: Response) {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: "As datas de início e fim são obrigatórias." });
        }

        const service = new GetMarketingClicksByDateService();
        const data = await service.execute(startDate as string, endDate as string);

        return res.json(data);
    }
}

export { GetMarketingClicksByDateController };
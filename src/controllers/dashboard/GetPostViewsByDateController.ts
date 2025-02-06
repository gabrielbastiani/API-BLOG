import { Request, Response } from "express";
import { GetPostViewsByDateService } from "../../services/dashboard/GetPostViewsByDateService";

class GetPostViewsByDateController {
    async handle(req: Request, res: Response) {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: "As datas de início e fim são obrigatórias." });
        }

        const service = new GetPostViewsByDateService();
        const data = await service.execute(startDate as string, endDate as string);

        return res.json(data);
    }
}

export { GetPostViewsByDateController };
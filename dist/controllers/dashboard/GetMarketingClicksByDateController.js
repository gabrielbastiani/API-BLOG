"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMarketingClicksByDateController = void 0;
const GetMarketingClicksByDateService_1 = require("../../services/dashboard/GetMarketingClicksByDateService");
class GetMarketingClicksByDateController {
    async handle(req, res) {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ error: "As datas de início e fim são obrigatórias." });
        }
        const service = new GetMarketingClicksByDateService_1.GetMarketingClicksByDateService();
        const data = await service.execute(startDate, endDate);
        return res.json(data);
    }
}
exports.GetMarketingClicksByDateController = GetMarketingClicksByDateController;
//# sourceMappingURL=GetMarketingClicksByDateController.js.map
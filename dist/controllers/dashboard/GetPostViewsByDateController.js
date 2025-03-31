"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostViewsByDateController = void 0;
const GetPostViewsByDateService_1 = require("../../services/dashboard/GetPostViewsByDateService");
class GetPostViewsByDateController {
    async handle(req, res) {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ error: "As datas de início e fim são obrigatórias." });
        }
        const service = new GetPostViewsByDateService_1.GetPostViewsByDateService();
        const data = await service.execute(startDate, endDate);
        return res.json(data);
    }
}
exports.GetPostViewsByDateController = GetPostViewsByDateController;
//# sourceMappingURL=GetPostViewsByDateController.js.map
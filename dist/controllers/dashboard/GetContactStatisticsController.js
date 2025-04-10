"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetContactStatisticsController = void 0;
const GetContactStatisticsService_1 = require("../../services/dashboard/GetContactStatisticsService");
class GetContactStatisticsController {
    async handle(req, res) {
        const service = new GetContactStatisticsService_1.GetContactStatisticsService();
        try {
            const result = await service.execute();
            return res.json(result);
        }
        catch (error) {
            return res.status(500).json({ error: "Error fetching contact statistics" });
        }
    }
}
exports.GetContactStatisticsController = GetContactStatisticsController;
//# sourceMappingURL=GetContactStatisticsController.js.map
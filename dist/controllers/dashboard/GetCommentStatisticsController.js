"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommentStatisticsController = void 0;
const GetCommentStatisticsService_1 = require("../../services/dashboard/GetCommentStatisticsService");
class GetCommentStatisticsController {
    async handle(req, res) {
        const service = new GetCommentStatisticsService_1.GetCommentStatisticsService();
        try {
            const result = await service.execute();
            return res.json(result);
        }
        catch (error) {
            return res.status(500).json({ error: "Error fetching comment statistics" });
        }
    }
}
exports.GetCommentStatisticsController = GetCommentStatisticsController;
//# sourceMappingURL=GetCommentStatisticsController.js.map
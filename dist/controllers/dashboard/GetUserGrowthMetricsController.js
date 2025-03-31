"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserGrowthMetricsController = void 0;
const GetUserGrowthMetricsService_1 = require("../../services/dashboard/GetUserGrowthMetricsService");
class GetUserGrowthMetricsController {
    async handle(req, res) {
        const service = new GetUserGrowthMetricsService_1.GetUserGrowthMetricsService();
        const data = await service.execute();
        return res.json(data);
    }
}
exports.GetUserGrowthMetricsController = GetUserGrowthMetricsController;
//# sourceMappingURL=GetUserGrowthMetricsController.js.map
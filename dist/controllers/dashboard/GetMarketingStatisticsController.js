"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMarketingStatisticsController = void 0;
const GetMarketingStatisticsService_1 = require("../../services/dashboard/GetMarketingStatisticsService");
class GetMarketingStatisticsController {
    async handle(req, res) {
        const service = new GetMarketingStatisticsService_1.GetMarketingStatisticsService();
        const data = await service.execute();
        return res.json(data);
    }
}
exports.GetMarketingStatisticsController = GetMarketingStatisticsController;
//# sourceMappingURL=GetMarketingStatisticsController.js.map
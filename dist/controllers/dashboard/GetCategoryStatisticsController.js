"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategoryStatisticsController = void 0;
const GetCategoryStatisticsService_1 = require("../../services/dashboard/GetCategoryStatisticsService");
class GetCategoryStatisticsController {
    async handle(req, res) {
        const service = new GetCategoryStatisticsService_1.GetCategoryStatisticsService();
        const data = await service.execute();
        return res.json(data);
    }
}
exports.GetCategoryStatisticsController = GetCategoryStatisticsController;
//# sourceMappingURL=GetCategoryStatisticsController.js.map
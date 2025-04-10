"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostStatisticsController = void 0;
const GetPostStatisticsService_1 = require("../../services/dashboard/GetPostStatisticsService");
class GetPostStatisticsController {
    async handle(req, res) {
        const service = new GetPostStatisticsService_1.GetPostStatisticsService();
        const data = await service.execute();
        return res.json(data);
    }
}
exports.GetPostStatisticsController = GetPostStatisticsController;
//# sourceMappingURL=GetPostStatisticsController.js.map
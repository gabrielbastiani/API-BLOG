"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNewsletterStatisticsController = void 0;
const GetNewsletterStatisticsService_1 = require("../../services/dashboard/GetNewsletterStatisticsService");
class GetNewsletterStatisticsController {
    async handle(req, res) {
        const service = new GetNewsletterStatisticsService_1.GetNewsletterStatisticsService();
        const data = await service.execute();
        return res.json(data);
    }
}
exports.GetNewsletterStatisticsController = GetNewsletterStatisticsController;
//# sourceMappingURL=GetNewsletterStatisticsController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNewsletterStatisticsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const date_fns_1 = require("date-fns");
class GetNewsletterStatisticsService {
    async execute() {
        const today = (0, date_fns_1.startOfDay)(new Date());
        const thisWeek = (0, date_fns_1.startOfWeek)(new Date());
        const thisMonth = (0, date_fns_1.startOfMonth)(new Date());
        const dailyCount = await prisma_1.default.newsletter.count({ where: { created_at: { gte: today } } });
        const weeklyCount = await prisma_1.default.newsletter.count({ where: { created_at: { gte: thisWeek } } });
        const monthlyCount = await prisma_1.default.newsletter.count({ where: { created_at: { gte: thisMonth } } });
        const totalNewslatters = await prisma_1.default.newsletter.count();
        return { dailyCount, weeklyCount, monthlyCount, totalNewslatters };
    }
}
exports.GetNewsletterStatisticsService = GetNewsletterStatisticsService;
//# sourceMappingURL=GetNewsletterStatisticsService.js.map
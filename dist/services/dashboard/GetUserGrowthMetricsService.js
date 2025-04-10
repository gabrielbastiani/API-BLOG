"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserGrowthMetricsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const date_fns_1 = require("date-fns");
class GetUserGrowthMetricsService {
    async execute() {
        const today = (0, date_fns_1.startOfDay)(new Date());
        const thisWeek = (0, date_fns_1.startOfWeek)(new Date());
        const thisMonth = (0, date_fns_1.startOfMonth)(new Date());
        const dailyGrowth = await prisma_1.default.userBlog.count({
            where: { created_at: { gte: today } },
        });
        const weeklyGrowth = await prisma_1.default.userBlog.count({
            where: { created_at: { gte: thisWeek } },
        });
        const monthlyGrowth = await prisma_1.default.userBlog.count({
            where: { created_at: { gte: thisMonth } },
        });
        const totalUserBlog = await prisma_1.default.userBlog.count();
        return { dailyGrowth, weeklyGrowth, monthlyGrowth, totalUserBlog };
    }
}
exports.GetUserGrowthMetricsService = GetUserGrowthMetricsService;
//# sourceMappingURL=GetUserGrowthMetricsService.js.map
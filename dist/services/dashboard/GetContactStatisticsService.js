"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetContactStatisticsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetContactStatisticsService {
    async execute() {
        const dailyCount = await prisma_1.default.form_contact.count({
            where: {
                created_at: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)), // Hoje
                },
            },
        });
        const weeklyCount = await prisma_1.default.form_contact.count({
            where: {
                created_at: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Últimos 7 dias
                },
            },
        });
        const monthlyCount = await prisma_1.default.form_contact.count({
            where: {
                created_at: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Últimos 30 dias
                },
            },
        });
        const totalFormContacts = await prisma_1.default.form_contact.count();
        return {
            dailyCount,
            weeklyCount,
            monthlyCount,
            totalFormContacts
        };
    }
}
exports.GetContactStatisticsService = GetContactStatisticsService;
//# sourceMappingURL=GetContactStatisticsService.js.map
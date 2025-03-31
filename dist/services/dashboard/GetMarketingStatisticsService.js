"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMarketingStatisticsService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
const date_fns_1 = require("date-fns");
class GetMarketingStatisticsService {
    async execute() {
        const totalMarketing = await prisma_1.default.marketingPublication.count();
        const publicationByStatus = await prisma_1.default.marketingPublication.groupBy({
            by: ['status'],
            _count: { id: true },
        });
        const today = (0, date_fns_1.startOfDay)(new Date());
        const thisWeek = (0, date_fns_1.startOfWeek)(new Date());
        const thisMonth = (0, date_fns_1.startOfMonth)(new Date());
        const dailyClicks = await prisma_1.default.marketingPublication.findMany({
            where: {
                OR: [
                    { status: client_1.StatusMarketingPublication.Disponivel },
                    { status: client_1.StatusMarketingPublication.Disponivel_programado }
                ],
                updated_at: { gte: today },
            },
            select: {
                title: true,
                clicks: true,
            },
        });
        const weeklyClick = await prisma_1.default.marketingPublication.findMany({
            where: {
                OR: [
                    { status: client_1.StatusMarketingPublication.Disponivel },
                    { status: client_1.StatusMarketingPublication.Disponivel_programado }
                ],
                updated_at: { gte: thisWeek },
            },
            select: {
                title: true,
                clicks: true,
            },
        });
        const monthlyClick = await prisma_1.default.marketingPublication.findMany({
            where: {
                OR: [
                    { status: client_1.StatusMarketingPublication.Disponivel },
                    { status: client_1.StatusMarketingPublication.Disponivel_programado }
                ],
                updated_at: { gte: thisMonth },
            },
            select: {
                title: true,
                clicks: true,
            },
        });
        // Buscar publicações programados
        const publications = await prisma_1.default.marketingPublication.findMany({
            where: {
                OR: [
                    { status: client_1.StatusMarketingPublication.Disponivel },
                    { status: client_1.StatusMarketingPublication.Disponivel_programado }
                ],
                publish_at_start: {
                    not: null, // Apenas publicações com `publish_at_start`
                },
            },
            select: {
                id: true,
                title: true,
                publish_at_start: true,
                status: true,
            },
        });
        const totalPublicationPublish = await prisma_1.default.marketingPublication.count({
            where: {
                OR: [
                    { status: client_1.StatusMarketingPublication.Disponivel },
                    { status: client_1.StatusMarketingPublication.Disponivel_programado }
                ],
                publish_at_start: {
                    not: null,
                },
            }
        });
        // Organizar os publications por ano, mês e dia
        const calendarData = publications.reduce((acc, marketingPublication) => {
            const date = new Date(marketingPublication?.publish_at_start);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            if (!acc[year])
                acc[year] = {};
            if (!acc[year][month])
                acc[year][month] = {};
            if (!acc[year][month][day])
                acc[year][month][day] = [];
            acc[year][month][day].push({
                id: marketingPublication.id,
                title: marketingPublication.title,
                publish_at_start: marketingPublication.publish_at_start,
                status: marketingPublication.status,
            });
            return acc;
        }, {});
        const metrics = await prisma_1.default.marketingPublication.findMany({
            where: {
                OR: [
                    { status: client_1.StatusMarketingPublication.Disponivel },
                    { status: client_1.StatusMarketingPublication.Disponivel_programado }
                ],
            },
            select: {
                id: true,
                title: true,
                clicks: true,
            }
        });
        const metricsPublicationViews = metrics.map((marketingPublication) => ({
            ...marketingPublication, /* @ts-ignore */
            title: marketingPublication?.title.length > 30 /* @ts-ignore */
                ? `${marketingPublication?.title.slice(0, 30)}...`
                : marketingPublication.title,
        }));
        return {
            totalMarketing,
            publicationByStatus,
            dailyClicks,
            weeklyClick,
            monthlyClick,
            calendarData,
            totalPublicationPublish,
            metricsPublicationViews
        };
    }
}
exports.GetMarketingStatisticsService = GetMarketingStatisticsService;
//# sourceMappingURL=GetMarketingStatisticsService.js.map
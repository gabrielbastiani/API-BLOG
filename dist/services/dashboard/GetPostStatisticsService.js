"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostStatisticsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const date_fns_1 = require("date-fns");
class GetPostStatisticsService {
    async execute() {
        const totalPosts = await prisma_1.default.post.count();
        const postsByStatus = await prisma_1.default.post.groupBy({
            by: ['status'],
            _count: { id: true },
        });
        const today = (0, date_fns_1.startOfDay)(new Date());
        const thisWeek = (0, date_fns_1.startOfWeek)(new Date());
        const thisMonth = (0, date_fns_1.startOfMonth)(new Date());
        const dailyViews = await prisma_1.default.post.findMany({
            where: {
                status: "Disponivel",
                updated_at: { gte: today },
            },
            select: {
                title: true,
                views: true,
            },
        });
        const weeklyViews = await prisma_1.default.post.findMany({
            where: {
                status: "Disponivel",
                updated_at: { gte: thisWeek },
            },
            select: {
                title: true,
                views: true,
            },
        });
        const monthlyViews = await prisma_1.default.post.findMany({
            where: {
                status: "Disponivel",
                updated_at: { gte: thisMonth },
            },
            select: {
                title: true,
                views: true,
            },
        });
        // Buscar posts programados
        const posts = await prisma_1.default.post.findMany({
            where: {
                status: "Programado",
                publish_at: {
                    not: null, // Apenas posts com `publish_at`
                },
            },
            select: {
                id: true,
                title: true,
                publish_at: true,
                status: true,
            },
        });
        const totalPostsPublish = await prisma_1.default.post.count({
            where: {
                status: "Programado",
                publish_at: {
                    not: null,
                },
            }
        });
        // Organizar os posts por ano, mês e dia
        const calendarData = posts.reduce((acc, post) => {
            const date = new Date(post?.publish_at);
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
                id: post.id,
                title: post.title,
                publish_at: post.publish_at,
                status: post.status,
            });
            return acc;
        }, {});
        const metrics = await prisma_1.default.post.findMany({
            where: {
                status: "Disponivel"
            },
            select: {
                id: true,
                title: true,
                post_like: true,
                post_dislike: true,
            }
        });
        const metricsPostsLikesDislikes = metrics.map((post) => ({
            ...post,
            title: post.title.length > 30
                ? `${post.title.slice(0, 30)}...`
                : post.title,
        }));
        return {
            totalPosts,
            postsByStatus,
            dailyViews,
            weeklyViews,
            monthlyViews,
            calendarData,
            totalPostsPublish,
            metricsPostsLikesDislikes
        };
    }
}
exports.GetPostStatisticsService = GetPostStatisticsService;
//# sourceMappingURL=GetPostStatisticsService.js.map
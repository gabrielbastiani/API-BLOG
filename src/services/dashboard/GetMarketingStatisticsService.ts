import { StatusMarketingPublication } from "@prisma/client";
import prismaClient from "../../prisma";
import { startOfDay, startOfWeek, startOfMonth } from 'date-fns';

class GetMarketingStatisticsService {
    async execute() {
        const totalMarketing = await prismaClient.marketingPublication.count();
        const publicationByStatus = await prismaClient.marketingPublication.groupBy({
            by: ['status'],
            _count: { id: true },
        });
        const today = startOfDay(new Date());
        const thisWeek = startOfWeek(new Date());
        const thisMonth = startOfMonth(new Date());

        const dailyClicks = await prismaClient.marketingPublication.findMany({
            where: {
                OR: [
                    { status: StatusMarketingPublication.Disponivel },
                    { status: StatusMarketingPublication.Disponivel_programado }
                ],
                updated_at: { gte: today },
            },
            select: {
                title: true,
                clicks: true,
            },
        });

        const weeklyClick = await prismaClient.marketingPublication.findMany({
            where: {
                OR: [
                    { status: StatusMarketingPublication.Disponivel },
                    { status: StatusMarketingPublication.Disponivel_programado }
                ],
                updated_at: { gte: thisWeek },
            },
            select: {
                title: true,
                clicks: true,
            },
        });

        const monthlyClick = await prismaClient.marketingPublication.findMany({
            where: {
                OR: [
                    { status: StatusMarketingPublication.Disponivel },
                    { status: StatusMarketingPublication.Disponivel_programado }
                ],
                updated_at: { gte: thisMonth },
            },
            select: {
                title: true,
                clicks: true,
            },
        });

        // Buscar publicações programados
        const publications = await prismaClient.marketingPublication.findMany({
            where: {
                OR: [
                    { status: StatusMarketingPublication.Disponivel },
                    { status: StatusMarketingPublication.Disponivel_programado }
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

        const totalPublicationPublish = await prismaClient.marketingPublication.count({
            where: {
                OR: [
                    { status: StatusMarketingPublication.Disponivel },
                    { status: StatusMarketingPublication.Disponivel_programado }
                ],
                publish_at_start: {
                    not: null,
                },
            }
        });

        // Organizar os publications por ano, mês e dia
        const calendarData = publications.reduce((acc: any, marketingPublication) => {/* @ts-ignore */
            const date = new Date(marketingPublication?.publish_at_start);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            if (!acc[year]) acc[year] = {};
            if (!acc[year][month]) acc[year][month] = {};
            if (!acc[year][month][day]) acc[year][month][day] = [];

            acc[year][month][day].push({
                id: marketingPublication.id,
                title: marketingPublication.title,
                publish_at_start: marketingPublication.publish_at_start,
                status: marketingPublication.status,
            });

            return acc;
        }, {});

        const metrics = await prismaClient.marketingPublication.findMany({
            where: {
                OR: [
                    { status: StatusMarketingPublication.Disponivel },
                    { status: StatusMarketingPublication.Disponivel_programado }
                ],
            },
            select: {
                id: true,
                title: true,
                clicks: true,
            }
        });

        const metricsPublicationViews = metrics.map((marketingPublication) => ({
            ...marketingPublication,/* @ts-ignore */
            title: marketingPublication?.title.length > 30/* @ts-ignore */
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

export { GetMarketingStatisticsService };
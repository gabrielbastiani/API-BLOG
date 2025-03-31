import moment from "moment";
import prismaClient from "../../prisma";

class GetMarketingClicksByDateService {
    async execute(startDate: string, endDate: string) {
        const publicationClicksRaw = await prismaClient.marketingPublicationView.findMany({
            where: {
                created_at: {
                    gte: moment(startDate).startOf('day').toISOString(),
                    lte: moment(endDate).endOf('day').toISOString()
                },
            },
            select: {
                marketingPublication_id: true,
                created_at: true,
                marketingPublication: { select: { title: true } }, // Busca o título da publicidade
            },
        });

        const formattedData: { date: string; title: string; clicks: number }[] = [];

        const clickMap: Record<string, Record<string, number>> = {}; // Para armazenar os dados temporariamente

        publicationClicksRaw.forEach(({ created_at, marketingPublication }) => {
            const date = created_at.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD

            if (!clickMap[date]) clickMap[date] = {}; /* @ts-ignore */
            if (!clickMap[date][marketingPublication.title]) clickMap[date][marketingPublication.title] = 0; // Inicializa o contador de clicks
            /* @ts-ignore */
            clickMap[date][marketingPublication.title] += 1; // Incrementa o contador de clicks
        });

        // Converte os dados para o formato final
        Object.entries(clickMap).forEach(([date, marketingpublications]) => {
            Object.entries(marketingpublications).forEach(([title, clicks]) => {
                formattedData.push({ date, title, clicks });
            });
        });

        return formattedData;

    }
}

export { GetMarketingClicksByDateService };
import moment from "moment";
import prismaClient from "../../prisma";

class GetPostViewsByDateService {
    async execute(startDate: string, endDate: string) {
        const postViewsRaw = await prismaClient.postView.findMany({
            where: {
                created_at: {
                    gte: moment(startDate).startOf('day').toISOString(),
                    lte: moment(endDate).endOf('day').toISOString()
                },
            },
            select: {
                post_id: true,
                created_at: true,
                post: { select: { title: true } }, // Busca o título do post
            },
        });

        const formattedData: { date: string; title: string; views: number }[] = [];

        const viewMap: Record<string, Record<string, number>> = {}; // Para armazenar os dados temporariamente

        postViewsRaw.forEach(({ created_at, post }) => {
            const date = created_at.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD

            if (!viewMap[date]) viewMap[date] = {}; /* @ts-ignore */
            if (!viewMap[date][post.title]) viewMap[date][post.title] = 0; // Inicializa o contador de views
            /* @ts-ignore */
            viewMap[date][post.title] += 1; // Incrementa o contador de views
        });

        // Converte os dados para o formato final
        Object.entries(viewMap).forEach(([date, posts]) => {
            Object.entries(posts).forEach(([title, views]) => {
                formattedData.push({ date, title, views });
            });
        });

        return formattedData;

    }
}

export { GetPostViewsByDateService };
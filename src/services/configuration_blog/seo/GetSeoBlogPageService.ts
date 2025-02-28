import prismaClient from "../../../prisma";

interface SeoProps {
    page: string;
}

class GetSeoBlogPageService {
    async execute({ page }: SeoProps) {
        const seoPage = await prismaClient.sEOSettings.findFirst({
            where: {
                page: page
            }
        });

        return seoPage;

    }
}

export { GetSeoBlogPageService }
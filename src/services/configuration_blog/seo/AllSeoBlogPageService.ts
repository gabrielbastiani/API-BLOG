import prismaClient from "../../../prisma";

class AllSeoBlogPageService {
    async execute() {
        const seoPage = await prismaClient.sEOSettings.findMany();

        return seoPage;

    }
}

export { AllSeoBlogPageService }
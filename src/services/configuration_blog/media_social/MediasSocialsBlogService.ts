import prismaClient from "../../../prisma"; 

class MediasSocialsBlogService {
    async execute() {
        const config = await prismaClient.socialMediasBlog.findMany({
            orderBy: {
                created_at: "desc"
            }
        });
        return config;
    }
}

export { MediasSocialsBlogService }
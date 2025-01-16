import prismaClient from "../../../prisma"; 

class MediasSocialsBlogService {
    async execute() {
        const config = await prismaClient.socialMediasBlog.findMany();
        return config;
    }
}

export { MediasSocialsBlogService }
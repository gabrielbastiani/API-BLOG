import prismaClient from "../../../prisma";

interface MediaProps {
    socialMediasBlog_id: string;
}

class DeleteMediasSocialsBlogService {
    async execute({ socialMediasBlog_id }: MediaProps) {
        const config = await prismaClient.socialMediasBlog.delete({
            where: {
                id: socialMediasBlog_id
            }
        });

        return config;

    }
}

export { DeleteMediasSocialsBlogService }
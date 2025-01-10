import prismaClient from "../../../prisma";

interface CreateMarketingPublicationServiceProps {
    name?: string;
    description?: string;
    banner_interval?: number;
}

class CreateTypeConfigurationMarketingService {
    async execute({
        name,
        description,
        banner_interval
    }: CreateMarketingPublicationServiceProps) {
        const marketing_publication = await prismaClient.configurationMarketingType.create({
            data: {
                name,
                description,
                banner_interval
            },
        });

        return marketing_publication;
    }
}

export { CreateTypeConfigurationMarketingService };
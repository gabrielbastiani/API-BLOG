import prismaClient from "../../../prisma";

interface ConfigurationProps {
    value: string;
    configurationMarketingType_id: string;
}

class CreateConfigurationMarketingService {
    async execute({
        value,
        configurationMarketingType_id
    }: ConfigurationProps) {
        const marketing_publication = await prismaClient.configurationMarketingConfiguration.create({
            data: {
                value,
                configurationMarketingType_id
            },
        });

        return marketing_publication;
    }
}

export { CreateConfigurationMarketingService };
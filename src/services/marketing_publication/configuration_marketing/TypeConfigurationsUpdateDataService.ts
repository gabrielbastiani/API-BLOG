import prismaClient from '../../../prisma'; 

interface ConfigsProps {
    configurationMarketingType_id: string;
    name?: string;
    description?: string;
    value?: string;
    configurationMarketingConfiguration_id?: string;
}

class TypeConfigurationsUpdateDataService {
    async execute({
        configurationMarketingType_id,
        name,
        description,
        value,
        configurationMarketingConfiguration_id
    }: ConfigsProps) {

        const dataToUpdate: any = {};

        if (name) {
            dataToUpdate.name = name;
        }

        if (description) {
            dataToUpdate.description = description;
        }

        if (value) {
            const update_configs = await prismaClient.configurationMarketingConfiguration.update({
                where: {
                    id: configurationMarketingConfiguration_id
                },
                data: {
                    value: value
                }
            });

            return update_configs;
        }

        const update_configuration = await prismaClient.configurationMarketingType.update({
            where: {
                id: configurationMarketingType_id
            },
            data: dataToUpdate
        });

        return update_configuration;
    }
}

export { TypeConfigurationsUpdateDataService };
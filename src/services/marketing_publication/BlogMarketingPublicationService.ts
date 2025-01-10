import { StatusMarketingPublication } from "@prisma/client";
import prismaClient from "../../prisma";

class BlogMarketingPublicationService {
    async execute() {
        const publications_blog = await prismaClient.marketingPublication.findMany({
            where: {
                status: StatusMarketingPublication.Disponivel,
                /* status: StatusMarketingPublication.Disponivel_programado, */
            },
            include: {
                configurationMarketingOnPublication: {
                    include: {
                        configurationMarketingType: {
                            include: {
                                configurationMarketingConfiguration: true
                            }
                        }
                    }
                }
            }
        });

        return publications_blog;

    }
}

export { BlogMarketingPublicationService };
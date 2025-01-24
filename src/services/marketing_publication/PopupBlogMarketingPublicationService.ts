import { Position, StatusMarketingPublication } from "@prisma/client";
import prismaClient from "../../prisma";

interface MarketingProps {
    local?: string;
    position?: string;
}

class PopupBlogMarketingPublicationService {
    async execute({ local, position }: MarketingProps) {
        const publications_blog_popup = await prismaClient.marketingPublication.findFirst({
            where: {
                local: local,
                position: position = position as Position,
                OR: [
                    { status: StatusMarketingPublication.Disponivel },
                    { status: StatusMarketingPublication.Disponivel_programado }
                ]
            }
        });

        return publications_blog_popup;

    }
}

export { PopupBlogMarketingPublicationService };
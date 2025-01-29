import { Position, StatusMarketingPublication } from "@prisma/client";
import prismaClient from "../../prisma";

interface PageInterval {
    local: string;
}

class ExistingSlidesBannerPageService {
    async execute({ local }: PageInterval) {
        const bannerInterval = await prismaClient.marketingPublication.findMany({
            where: {
                local: local,
                position: Position.SLIDER,
                OR: [
                    { status: StatusMarketingPublication.Disponivel },
                    { status: StatusMarketingPublication.Disponivel_programado }
                ]
            }
        });
        return bannerInterval;
    }
}

export { ExistingSlidesBannerPageService };
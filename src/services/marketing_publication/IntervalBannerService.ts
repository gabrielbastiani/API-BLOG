import prismaClient from "../../prisma";

interface IntervalProps {
    interval_banner: number;
    local_site: string;
    label_local_site: string;
}

class IntervalBannerService {
    async execute({interval_banner, local_site, label_local_site}: IntervalProps) {

        const bannerInterval = await prismaClient.bannerInterval.create({
            data: {
                interval_banner: interval_banner && !isNaN(Number(interval_banner)) ? Number(interval_banner) : undefined,
                local_site: local_site,
                label_local_site: label_local_site
            },
        });

        return bannerInterval;
    }
}

export { IntervalBannerService };
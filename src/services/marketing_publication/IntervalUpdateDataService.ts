import prismaClient from '../../prisma';

interface IntervalProps {
    bannerInterval_id: string;
    local_site?: string;
    label_local_site?: string;
    interval_banner?: number;
}

class IntervalUpdateDataService {
    async execute({
        bannerInterval_id,
        local_site,
        label_local_site,
        interval_banner
    }: IntervalProps) {

        const dataToUpdate: any = {};

        if (local_site) {
            dataToUpdate.local_site = local_site;
        }

        if (label_local_site) {
            dataToUpdate.label_local_site = label_local_site;
        }

        if (interval_banner) {
            dataToUpdate.interval_banner = interval_banner && !isNaN(Number(interval_banner)) ? Number(interval_banner) : undefined
        }

        const update_interval = await prismaClient.bannerInterval.update({
            where: {
                id: bannerInterval_id
            },
            data: dataToUpdate
        });

        return update_interval;
    }
}

export { IntervalUpdateDataService };
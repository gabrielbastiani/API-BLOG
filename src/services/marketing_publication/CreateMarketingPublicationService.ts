import { RoleUser } from "@prisma/client";
import prismaClient from "../../prisma";

interface CreateMarketingPublicationServiceProps {
    title?: string;
    description?: string;
    image_url?: string;
    redirect_url?: string;
    publish_at_start?: Date;
    publish_at_end?: Date;
    status?: "Disponivel" | "Indisponivel" | "Programado";
    position: "SLIDER" | "TOP_BANNER" | "SIDEBAR" | "POPUP";
    conditions?: string;
    text_publication?: string;
    local?: string;
    popup_time?: number;
    text_button?: string;
}

class CreateMarketingPublicationService {
    async execute({
        title,
        description,
        image_url,
        redirect_url,
        publish_at_start,
        publish_at_end,
        status,
        position,
        conditions,
        text_publication,
        local,
        popup_time,
        text_button
    }: CreateMarketingPublicationServiceProps) {

        const marketing_publication = await prismaClient.marketingPublication.create({
            data: {
                title,
                description,
                image_url,
                text_button,
                redirect_url,
                publish_at_start: publish_at_start ? new Date(publish_at_start).toISOString() : null,
                publish_at_end: publish_at_end ? new Date(publish_at_end).toISOString() : null,
                position,
                conditions,
                status,
                text_publication,
                local,
                popup_time: popup_time && !isNaN(Number(popup_time)) ? Number(popup_time) : undefined
            },
        });

        const users_superAdmins = await prismaClient.user.findMany({ where: { role: RoleUser.SUPER_ADMIN } });
        const users_admins = await prismaClient.user.findMany({ where: { role: RoleUser.ADMIN } });

        const all_user_ids = [
            ...users_superAdmins.map((user) => user.id),
            ...users_admins.map((user) => user.id),
        ];

        const notificationsData = all_user_ids.map((user_id) => ({
            user_id,
            message: `Publicidade "${title ? title : "Sem titulo"}" cadastrada.`,
            type: "marketing",
        }));

        await prismaClient.notificationUser.createMany({ data: notificationsData });

        return marketing_publication;
    }
}

export { CreateMarketingPublicationService };
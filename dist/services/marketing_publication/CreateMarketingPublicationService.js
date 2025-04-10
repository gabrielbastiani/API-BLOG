"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMarketingPublicationService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class CreateMarketingPublicationService {
    async execute({ title, description, image_url, redirect_url, publish_at_start, publish_at_end, status, position, conditions, text_publication, local, popup_time, text_button }) {
        const marketing_publication = await prisma_1.default.marketingPublication.create({
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
        const users_superAdmins = await prisma_1.default.user.findMany({ where: { role: client_1.RoleUser.SUPER_ADMIN } });
        const users_admins = await prisma_1.default.user.findMany({ where: { role: client_1.RoleUser.ADMIN } });
        const all_user_ids = [
            ...users_superAdmins.map((user) => user.id),
            ...users_admins.map((user) => user.id),
        ];
        const notificationsData = all_user_ids.map((user_id) => ({
            user_id,
            message: `Publicidade "${title ? title : "Sem titulo"}" cadastrada.`,
            type: "marketing",
        }));
        await prisma_1.default.notificationUser.createMany({ data: notificationsData });
        return marketing_publication;
    }
}
exports.CreateMarketingPublicationService = CreateMarketingPublicationService;
//# sourceMappingURL=CreateMarketingPublicationService.js.map
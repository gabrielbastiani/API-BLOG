"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterCreateService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class NewsletterCreateService {
    async execute({ email_user }) {
        const comment_create = await prisma_1.default.newsletter.create({
            data: {
                email_user: email_user
            }
        });
        const users_superAdmins = await prisma_1.default.user.findMany({
            where: {
                role: client_1.RoleUser.SUPER_ADMIN
            }
        });
        const users_admins = await prisma_1.default.user.findMany({
            where: {
                role: client_1.RoleUser.ADMIN
            }
        });
        const all_user_ids = [
            ...users_superAdmins.map(user => user.id),
            ...users_admins.map(user => user.id)
        ];
        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message: "Novo newslatter cadastrado",
            type: "newsletter"
        }));
        await prisma_1.default.notificationUser.createMany({
            data: notificationsData
        });
        return comment_create;
    }
}
exports.NewsletterCreateService = NewsletterCreateService;
//# sourceMappingURL=NewsletterCreateService.js.map
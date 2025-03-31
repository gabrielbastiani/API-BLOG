"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingPublicationDeleteService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class MarketingPublicationDeleteService {
    async execute({ id_delete, name }) {
        const publications = await prisma_1.default.marketingPublication.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        publications.forEach((marketingPublication) => {
            if (marketingPublication?.image_url) {
                const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + marketingPublication?.image_url);
                fs_1.default.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image for marketingPublication ${marketingPublication.id}: ${err.message}`);
                    }
                    else {
                        console.log(`Image for marketingPublication ${marketingPublication.id} deleted successfully`);
                    }
                });
            }
        });
        // Remoção das categorias do banco de dados
        const deleted_publications = await prisma_1.default.marketingPublication.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        // Busca de IDs dos usuários SUPER_ADMIN e ADMIN
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
        // Criação de notificações para cada publicidade deletada e cada usuário
        await prisma_1.default.notificationUser.createMany({
            data: publications.flatMap((marketingPublication) => all_user_ids.map((user_id) => ({
                user_id,
                message: `Publicidade(s) ${marketingPublication.title} foi deletada(s) pelo usuário ${name}.`,
                type: "marketing"
            })))
        });
        return deleted_publications;
    }
}
exports.MarketingPublicationDeleteService = MarketingPublicationDeleteService;
//# sourceMappingURL=MarketingPublicationDeleteService.js.map
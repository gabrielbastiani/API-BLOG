"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDeleteService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CategoryDeleteService {
    async execute({ id_delete, name }) {
        const categories = await prisma_1.default.category.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        categories.forEach((category) => {
            if (category.image_category) {
                const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + category.image_category);
                fs_1.default.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image for category ${category.id}: ${err.message}`);
                    }
                    else {
                        console.log(`Image for category ${category.id} deleted successfully`);
                    }
                });
            }
        });
        // Remoção das categorias do banco de dados
        const deleted_categories = await prisma_1.default.category.deleteMany({
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
        // Criação de notificações para cada categoria deletada e cada usuário
        await prisma_1.default.notificationUser.createMany({
            data: categories.flatMap((category) => all_user_ids.map((user_id) => ({
                user_id,
                message: `Categoria(s) ${category.name_category} foi deletada(s) pelo usuário ${name}.`,
                type: "category"
            })))
        });
        return deleted_categories;
    }
}
exports.CategoryDeleteService = CategoryDeleteService;
//# sourceMappingURL=CategoryDeleteService.js.map
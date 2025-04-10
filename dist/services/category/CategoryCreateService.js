"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryCreateService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class CategoryCreateService {
    async execute({ user_id, name_category, image_category, description, parentId }) {
        if (!name_category) {
            throw new Error("O nome da categoria é obrigatório.");
        }
        function removerAcentos(s) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }
        // Busca o maior valor de `order` entre as categorias com o mesmo `parentId`
        const maxOrderCategory = await prisma_1.default.category.findFirst({
            where: { parentId: parentId || null },
            orderBy: { order: 'desc' },
        });
        // Define o valor de `order` para a nova categoria
        const newOrder = maxOrderCategory ? maxOrderCategory.order + 1 : 1;
        // Cria a nova categoria com o valor de `order` definido
        const category = await prisma_1.default.category.create({
            data: {
                name_category,
                slug_name_category: removerAcentos(name_category),
                image_category: image_category,
                description: description,
                parentId: parentId || null,
                order: newOrder,
            }
        });
        // Notificação de criação para administradores e superadministradores
        const user_data = await prisma_1.default.user.findUnique({
            where: { id: user_id }
        });
        const users_superAdmins = await prisma_1.default.user.findMany({
            where: { role: client_1.RoleUser.SUPER_ADMIN }
        });
        const users_admins = await prisma_1.default.user.findMany({
            where: { role: client_1.RoleUser.ADMIN }
        });
        const all_user_ids = [
            ...users_superAdmins.map(user => user.id),
            ...users_admins.map(user => user.id)
        ];
        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message: `Categoria ${name_category} criada pelo usuário ${user_data?.name}.`,
            type: "category"
        }));
        await prisma_1.default.notificationUser.createMany({
            data: notificationsData
        });
        return category;
    }
}
exports.CategoryCreateService = CategoryCreateService;
//# sourceMappingURL=CategoryCreateService.js.map
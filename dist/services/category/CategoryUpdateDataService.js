"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUpdateDataService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CategoryUpdateDataService {
    async execute({ category_id, name_category, description, image_category, status, parentId, order }) {
        function removerAcentos(s) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }
        const category = await prisma_1.default.category.findUnique({
            where: { id: category_id }
        });
        const dataToUpdate = {};
        if (name_category) {
            dataToUpdate.name_category = name_category;
            dataToUpdate.slug_name_category = removerAcentos(name_category);
        }
        if (description) {
            dataToUpdate.description = description;
        }
        if (image_category) {
            if (category?.image_category) {
                const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + category?.image_category);
                console.log(`Deleting image: ${imagePath}`);
                fs_1.default.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old image: ${err.message}`);
                    }
                    else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            dataToUpdate.image_category = image_category;
        }
        if (status) {
            dataToUpdate.status = status;
        }
        if (parentId) {
            dataToUpdate.parentId = parentId;
        }
        if (order) {
            dataToUpdate.order = Number(order);
        }
        const update_category = await prisma_1.default.category.update({
            where: {
                id: category_id
            },
            data: dataToUpdate
        });
        return update_category;
    }
}
exports.CategoryUpdateDataService = CategoryUpdateDataService;
//# sourceMappingURL=CategoryUpdateDataService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDeleteImageService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CategoryDeleteImageService {
    async execute({ category_id }) {
        const image_category = await prisma_1.default.category.findUnique({
            where: {
                id: category_id
            }
        });
        const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + image_category?.image_category);
        fs_1.default.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Failed to delete old image: ${err.message}`);
            }
            else {
                console.log('Old image deleted successfully');
            }
        });
        const category = await prisma_1.default.category.update({
            where: {
                id: category_id
            },
            data: {
                image_category: ""
            }
        });
        return category;
    }
}
exports.CategoryDeleteImageService = CategoryDeleteImageService;
//# sourceMappingURL=CategoryDeleteImageService.js.map
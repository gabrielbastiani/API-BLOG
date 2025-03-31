"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingDeleteImageService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class MarketingDeleteImageService {
    async execute({ marketingPublication_id }) {
        const image_publication = await prisma_1.default.marketingPublication.findUnique({
            where: {
                id: marketingPublication_id
            }
        });
        const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + image_publication?.image_url);
        fs_1.default.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Failed to delete old image: ${err.message}`);
            }
            else {
                console.log('Old image deleted successfully');
            }
        });
        const marketingPublication = await prisma_1.default.marketingPublication.update({
            where: {
                id: marketingPublication_id
            },
            data: {
                image_url: ""
            }
        });
        return marketingPublication;
    }
}
exports.MarketingDeleteImageService = MarketingDeleteImageService;
//# sourceMappingURL=MarketingDeleteImageService.js.map
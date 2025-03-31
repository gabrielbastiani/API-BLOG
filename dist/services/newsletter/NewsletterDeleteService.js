"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterDeleteService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class NewsletterDeleteService {
    async execute({ id_delete }) {
        const form = await prisma_1.default.newsletter.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        return form;
    }
}
exports.NewsletterDeleteService = NewsletterDeleteService;
//# sourceMappingURL=NewsletterDeleteService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMediasSocialsBlogService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteMediasSocialsBlogService {
    async execute({ socialMediasBlog_id }) {
        const config = await prisma_1.default.socialMediasBlog.delete({
            where: {
                id: socialMediasBlog_id
            }
        });
        return config;
    }
}
exports.DeleteMediasSocialsBlogService = DeleteMediasSocialsBlogService;
//# sourceMappingURL=DeleteMediasSocialsBlogService.js.map
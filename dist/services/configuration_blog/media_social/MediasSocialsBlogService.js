"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediasSocialsBlogService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class MediasSocialsBlogService {
    async execute() {
        const config = await prisma_1.default.socialMediasBlog.findMany({
            orderBy: {
                created_at: "desc"
            }
        });
        return config;
    }
}
exports.MediasSocialsBlogService = MediasSocialsBlogService;
//# sourceMappingURL=MediasSocialsBlogService.js.map
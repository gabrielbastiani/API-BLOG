"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitemapService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class SitemapService {
    async execute() {
        const post = await prisma_1.default.post.findMany({
            where: {
                status: client_1.StatusPost.Disponivel
            }
        });
        return post;
    }
}
exports.SitemapService = SitemapService;
//# sourceMappingURL=SitemapService.js.map
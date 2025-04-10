"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTagService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateTagService {
    async execute({ tag_name }) {
        function removerAcentos(s) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }
        const tags = await prisma_1.default.tag.create({
            data: {
                tag_name: tag_name,
                slug_tag_name: removerAcentos(tag_name)
            }
        });
        return tags;
    }
}
exports.CreateTagService = CreateTagService;
//# sourceMappingURL=CreateTagService.js.map
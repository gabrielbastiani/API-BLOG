"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagDeleteService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class TagDeleteService {
    async execute({ id_delete }) {
        const deleteTags = await prisma_1.default.tag.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        return deleteTags;
    }
}
exports.TagDeleteService = TagDeleteService;
//# sourceMappingURL=TagDeleteService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSeoBlogService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class CreateSeoBlogService {
    async execute(seoData) {
        const config = await prisma_1.default.sEOSettings.create({
            data: seoData
        });
        return config;
    }
}
exports.CreateSeoBlogService = CreateSeoBlogService;
//# sourceMappingURL=CreateSeoBlogService.js.map
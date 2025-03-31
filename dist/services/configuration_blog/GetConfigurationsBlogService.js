"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConfigurationsBlogService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetConfigurationsBlogService {
    async execute() {
        const config = await prisma_1.default.configurationBlog.findFirst();
        return config;
    }
}
exports.GetConfigurationsBlogService = GetConfigurationsBlogService;
//# sourceMappingURL=GetConfigurationsBlogService.js.map
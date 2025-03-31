"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConfigurationBlogService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateConfigurationBlogService {
    async execute({ name_blog, email_blog, logo, favicon }) {
        const config = await prisma_1.default.configurationBlog.create({
            data: {
                name_blog: name_blog,
                email_blog: email_blog,
                logo: logo,
                favicon: favicon,
                phone: "(99) 99999-9999",
                description_blog: "Escreva uma descrição para o blog, do que se trata...",
                author_blog: "Nome do(a) dono(a) do blog",
                about_author_blog: "Sobre o autor do blog",
                privacy_policies: "Escrveva aqui seu texto das suas politicas de privacidades focado na lei LGPD"
            }
        });
        return config;
    }
}
exports.CreateConfigurationBlogService = CreateConfigurationBlogService;
//# sourceMappingURL=CreateConfigurationBlogService.js.map
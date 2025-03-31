"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUpdateDataService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class PostUpdateDataService {
    async execute({ post_id, author, title, text_post, image_post, status, publish_at, categories, tags, seo_description, seo_keywords, custom_url }) {
        function removerAcentos(s) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }
        const post = await prisma_1.default.post.findUnique({
            where: { id: post_id }
        });
        const dataToUpdate = {};
        if (seo_keywords) {
            const keywords = Array.isArray(seo_keywords) ? seo_keywords : JSON.parse(seo_keywords);
            dataToUpdate.seo_keywords = keywords;
        }
        if (seo_description) {
            dataToUpdate.seo_description = seo_description;
        }
        if (custom_url) {
            dataToUpdate.custom_url = removerAcentos(custom_url);
        }
        if (author) {
            dataToUpdate.author = author;
        }
        if (title) {
            dataToUpdate.title = title;
            dataToUpdate.slug_title_post = removerAcentos(title);
        }
        if (image_post) {
            if (post?.image_post) {
                const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + post?.image_post);
                fs_1.default.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old image: ${err.message}`);
                    }
                    else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            dataToUpdate.image_post = image_post;
        }
        if (status) {
            dataToUpdate.status = status;
        }
        if (text_post) {
            dataToUpdate.text_post = text_post;
        }
        if (publish_at) {
            dataToUpdate.publish_at = publish_at;
        }
        // Atualizar categorias
        if (categories) {
            // Deletar categorias antigas
            await prisma_1.default.categoryOnPost.deleteMany({
                where: { post_id },
            });
            // Adicionar novas categorias
            const categoryRelations = categories.map((category_id) => ({
                post_id,
                category_id,
            }));
            await prisma_1.default.categoryOnPost.createMany({
                data: categoryRelations,
            });
        }
        // Atualizar tags
        if (tags) {
            // Deletar tags antigas
            await prisma_1.default.tagOnPost.deleteMany({
                where: { post_id },
            });
            // Adicionar novas tags
            const tagRelations = tags.map((tag_id) => ({
                post_id,
                tag_id,
            }));
            await prisma_1.default.tagOnPost.createMany({
                data: tagRelations,
            });
        }
        const updatedPost = await prisma_1.default.post.update({
            where: { id: post_id },
            data: dataToUpdate,
        });
        return updatedPost;
    }
}
exports.PostUpdateDataService = PostUpdateDataService;
//# sourceMappingURL=PostUpdateDataService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkPostsImportService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
const exceljs_1 = __importDefault(require("exceljs"));
const fs_1 = __importDefault(require("fs"));
class BulkPostsImportService {
    async execute(filePath, user_id) {
        const workbook = new exceljs_1.default.Workbook();
        try {
            await workbook.xlsx.readFile(filePath);
        }
        catch (error) {
            throw new Error("Failed to read Excel file");
        }
        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
            throw new Error("No worksheet found in Excel file");
        }
        const posts = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1)
                return; // Ignorar cabeçalho
            const [_, author, title, text_post, status, publish_at, tags, categories] = row.values;
            if (!author || !title) {
                console.warn(`Row ${rowNumber} is missing required fields.`);
                return;
            }
            function removerAcentos(s) {
                return s
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/ +/g, "-")
                    .replace(/-{2,}/g, "-")
                    .replace(/[/]/g, "-");
            }
            posts.push({
                author,
                title,
                slug_title_post: removerAcentos(title),
                status,
                publish_at: publish_at ? new Date(publish_at) : null,
                text_post,
                tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
                categories: categories ? categories.split(",").map(cat => cat.trim()) : []
            });
        });
        const createdPosts = [];
        /* @ts-ignore */
        for (const post of posts) {
            const newPost = await prisma_1.default.post.create({
                data: {
                    author: post.author,
                    title: post.title,
                    slug_title_post: post.slug_title_post,
                    status: post.status,
                    publish_at: post.publish_at,
                    text_post: post.text_post,
                },
            });
            // Relacionar categorias ao post
            if (post.categories.length > 0) {
                const categoryRelations = post.categories.map((categoryId) => ({
                    post_id: newPost.id,
                    category_id: categoryId,
                }));
                await prisma_1.default.categoryOnPost.createMany({
                    data: categoryRelations,
                    skipDuplicates: true,
                });
            }
            // Relacionar tags ao post
            if (post.tags.length > 0) {
                const tagRelations = post.tags.map((tagId) => ({
                    post_id: newPost.id,
                    tag_id: tagId,
                }));
                await prisma_1.default.tagOnPost.createMany({
                    data: tagRelations,
                    skipDuplicates: true,
                });
            }
            createdPosts.push(newPost);
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: user_id },
        });
        if (!user) {
            throw new Error("User not found.");
        }
        const superAdmins = await prisma_1.default.user.findMany({
            where: { role: client_1.RoleUser.SUPER_ADMIN },
        });
        const notificationsData = superAdmins.map(admin => ({
            user_id: admin.id,
            message: `Post(s) criados via planilha pelo usuario ${user.name}`,
            type: "post",
        }));
        try {
            await prisma_1.default.notificationUser.createMany({ data: notificationsData });
        }
        catch (error) {
            console.error("Failed to create notifications:", error);
        }
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error("Failed to delete file:", err);
            }
            else {
                console.log("File deleted successfully.");
            }
        });
        return createdPosts;
    }
}
exports.BulkPostsImportService = BulkPostsImportService;
//# sourceMappingURL=BulkPostsImportService.js.map
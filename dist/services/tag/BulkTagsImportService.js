"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkTagsImportService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
const exceljs_1 = __importDefault(require("exceljs"));
const fs_1 = __importDefault(require("fs"));
class BulkTagsImportService {
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
        const tags = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1)
                return;
            const [_, tag_name] = row.values;
            if (tag_name === null || tag_name === undefined) {
                console.warn(`Row ${rowNumber} has missing email: ${JSON.stringify(row.values)}`);
                return;
            }
            function removerAcentos(s) {
                return s.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/ +/g, "-")
                    .replace(/-{2,}/g, "-")
                    .replace(/[/]/g, "-");
            }
            tags.push({
                tag_name,
                slug_tag_name: removerAcentos(tag_name)
            });
        });
        const users_crate = await prisma_1.default.user.findUnique({
            where: {
                id: user_id
            }
        });
        const users_superAdmins = await prisma_1.default.user.findMany({
            where: {
                role: client_1.RoleUser.SUPER_ADMIN
            }
        });
        const all_user_ids = [
            ...users_superAdmins.map(user => user.id)
        ];
        const notificationsData = all_user_ids.map(user_id => ({
            user_id,
            message: `Tag(s) criada(s) via planilha pelo usuario ${users_crate?.name}`,
            type: "user"
        }));
        try {
            const createdUsers = await prisma_1.default.tag.createMany({
                data: tags,
                skipDuplicates: true,
            });
            await prisma_1.default.notificationUser.createMany({
                data: notificationsData
            });
            return createdUsers;
        }
        catch (error) {
            throw new Error("Failed to import tags to database");
        }
        finally {
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    console.error("Failed to delete file:", err);
                }
                else {
                    console.log("File deleted successfully");
                }
            });
        }
    }
}
exports.BulkTagsImportService = BulkTagsImportService;
//# sourceMappingURL=BulkTagsImportService.js.map
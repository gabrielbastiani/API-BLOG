"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFilesExcelService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DeleteFilesExcelService {
    async execute() {
        const directory = path_1.default.join(__dirname, '../../../temp_file');
        try {
            if (!fs_1.default.existsSync(directory)) {
                return { message: "A pasta temp_file não existe." };
            }
            const files = fs_1.default.readdirSync(directory);
            for (const file of files) {
                fs_1.default.unlinkSync(path_1.default.join(directory, file));
            }
            return { message: "Todos os arquivos foram deletados com sucesso." };
        }
        catch (error) {
            console.error("Erro ao deletar arquivos:", error);
            throw new Error("Erro ao deletar arquivos da pasta temp_file");
        }
    }
}
exports.DeleteFilesExcelService = DeleteFilesExcelService;
//# sourceMappingURL=DeleteFilesExcelService.js.map
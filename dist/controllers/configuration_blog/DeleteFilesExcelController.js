"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFilesExcelController = void 0;
const DeleteFilesExcelService_1 = require("../../services/configuration_blog/DeleteFilesExcelService");
class DeleteFilesExcelController {
    async handle(req, res) {
        const delete_files = new DeleteFilesExcelService_1.DeleteFilesExcelService();
        const files_delete = await delete_files.execute();
        return res.json(files_delete);
    }
}
exports.DeleteFilesExcelController = DeleteFilesExcelController;
//# sourceMappingURL=DeleteFilesExcelController.js.map
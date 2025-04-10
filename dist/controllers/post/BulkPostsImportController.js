"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.BulkPostsImportController = void 0;
const BulkPostsImportService_1 = require("../../services/post/BulkPostsImportService");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const upload = (0, multer_1.default)({ dest: path_1.default.resolve(__dirname, "../../../temp_file") });
exports.upload = upload;
class BulkPostsImportController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "File is required." });
        }
        const service = new BulkPostsImportService_1.BulkPostsImportService();
        try {
            const result = await service.execute(file.path, user_id);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error); /* @ts-ignore */
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.BulkPostsImportController = BulkPostsImportController;
//# sourceMappingURL=BulkPostsImportController.js.map
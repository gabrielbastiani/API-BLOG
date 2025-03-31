"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.BulkUserImportController = void 0;
const BulkUserImportService_1 = require("../../services/user/BulkUserImportService");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const upload = (0, multer_1.default)({ dest: path_1.default.resolve(__dirname, "../../../temp_file") });
exports.upload = upload;
class BulkUserImportController {
    async handle(req, res) {
        const user_id = req.query.user_id;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "File is required." });
        }
        const service = new BulkUserImportService_1.BulkUserImportService();
        try {
            const result = await service.execute(file.path, user_id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: "Failed to import users." });
        }
    }
}
exports.BulkUserImportController = BulkUserImportController;
//# sourceMappingURL=BulkUserImportController.js.map
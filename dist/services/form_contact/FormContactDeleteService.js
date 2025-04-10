"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormContactDeleteService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class FormContactDeleteService {
    async execute({ id_delete }) {
        const deletedForms = await prisma_1.default.form_contact.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        return deletedForms;
    }
}
exports.FormContactDeleteService = FormContactDeleteService;
//# sourceMappingURL=FormContactDeleteService.js.map
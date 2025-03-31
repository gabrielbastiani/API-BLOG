"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ContactService {
    async execute({ form_contact_id }) {
        const contact = await prisma_1.default.form_contact.findUnique({
            where: {
                id: form_contact_id
            }
        });
        return contact;
    }
}
exports.ContactService = ContactService;
//# sourceMappingURL=ContactService.js.map
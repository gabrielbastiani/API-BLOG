"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const ContactService_1 = require("../../services/form_contact/ContactService");
class ContactController {
    async handle(req, res) {
        const form_contact_id = req.query.form_contact_id;
        const detail_contact = new ContactService_1.ContactService();
        const contact = await detail_contact.execute({ form_contact_id });
        return res.json(contact);
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=ContactController.js.map
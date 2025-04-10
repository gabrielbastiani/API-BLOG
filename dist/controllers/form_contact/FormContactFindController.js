"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormContactFindController = void 0;
const FormContactFindService_1 = require("../../services/form_contact/FormContactFindService");
class FormContactFindController {
    async handle(req, res) {
        const { page = 1, limit = 5, search = "", orderBy = "created_at", orderDirection = "desc", startDate, endDate } = req.query;
        const allContacts = new FormContactFindService_1.FormContactFindService();
        const contacts = await allContacts.execute(Number(page), Number(limit), String(search), String(orderBy), orderDirection, startDate ? String(startDate) : undefined, endDate ? String(endDate) : undefined);
        return res.json(contacts);
    }
}
exports.FormContactFindController = FormContactFindController;
//# sourceMappingURL=FormContactFindController.js.map
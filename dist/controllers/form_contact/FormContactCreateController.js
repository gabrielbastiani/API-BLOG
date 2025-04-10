"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormContactCreateController = void 0;
const FormContactCreateService_1 = require("../../services/form_contact/FormContactCreateService");
class FormContactCreateController {
    async handle(req, res) {
        const { email_user, name_user, subject, menssage } = req.body;
        const create_form = new FormContactCreateService_1.FormContactCreateService();
        const form = await create_form.execute({
            email_user,
            name_user,
            subject,
            menssage
        });
        return res.json(form);
    }
}
exports.FormContactCreateController = FormContactCreateController;
//# sourceMappingURL=FormContactCreateController.js.map
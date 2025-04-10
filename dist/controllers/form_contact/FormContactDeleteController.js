"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormContactDeleteController = void 0;
const FormContactDeleteService_1 = require("../../services/form_contact/FormContactDeleteService");
class FormContactDeleteController {
    async handle(req, res) {
        const { id_delete } = req.body;
        const formContactDeleteService = new FormContactDeleteService_1.FormContactDeleteService();
        const deletedForms = await formContactDeleteService.execute({
            id_delete
        });
        return res.json(deletedForms);
    }
}
exports.FormContactDeleteController = FormContactDeleteController;
//# sourceMappingURL=FormContactDeleteController.js.map
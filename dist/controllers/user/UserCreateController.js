"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateController = void 0;
const UserCreateService_1 = require("../../services/user/UserCreateService");
class UserCreateController {
    async handle(req, res) {
        const { name, email, password, image_user, role, send_email } = req.body;
        const createUser = new UserCreateService_1.UserCreateService();
        let imageToUpdate = image_user;
        if (!image_user && req.file) {
            imageToUpdate = req.file.filename;
        }
        const users = await createUser.execute({
            name,
            email,
            password,
            image_user: imageToUpdate,
            role,
            send_email
        });
        return res.json(users);
    }
}
exports.UserCreateController = UserCreateController;
//# sourceMappingURL=UserCreateController.js.map
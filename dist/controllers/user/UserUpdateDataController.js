"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateDataController = void 0;
const UserUpdateDataService_1 = require("../../services/user/UserUpdateDataService");
class UserUpdateDataController {
    async handle(req, res) {
        const { user_id, name, email, role, status, password } = req.body;
        const createUser = new UserUpdateDataService_1.UserUpdateDataService();
        let imageToUpdate = req.body.image_user;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }
        const users = await createUser.execute({
            user_id,
            name,
            email,
            image_user: imageToUpdate,
            role,
            status,
            password
        });
        return res.json(users);
    }
}
exports.UserUpdateDataController = UserUpdateDataController;
//# sourceMappingURL=UserUpdateDataController.js.map
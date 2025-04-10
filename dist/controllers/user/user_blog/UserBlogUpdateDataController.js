"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlogUpdateDataController = void 0;
const UserBlogUpdateDataService_1 = require("../../../services/user/user_blog/UserBlogUpdateDataService");
class UserBlogUpdateDataController {
    async handle(req, res) {
        const { user_id, name, email, status, password } = req.body;
        const createUser = new UserBlogUpdateDataService_1.UserBlogUpdateDataService();
        let imageToUpdate = req.body.image_user;
        if (req.file) {
            imageToUpdate = req.file.filename;
        }
        const users = await createUser.execute({
            user_id,
            name,
            email,
            image_user: imageToUpdate,
            status,
            password
        });
        return res.json(users);
    }
}
exports.UserBlogUpdateDataController = UserBlogUpdateDataController;
//# sourceMappingURL=UserBlogUpdateDataController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlogCreateController = void 0;
const UserBlogCreateService_1 = require("../../../services/user/user_blog/UserBlogCreateService");
class UserBlogCreateController {
    async handle(req, res) {
        const { name, email, password, image_user, newsletter } = req.body;
        const createUser = new UserBlogCreateService_1.UserBlogCreateService();
        let imageToUpdate = image_user;
        if (!image_user && req.file) {
            imageToUpdate = req.file.filename;
        }
        const users = await createUser.execute({
            name,
            email,
            password,
            image_user: imageToUpdate,
            newsletter
        });
        return res.json(users);
    }
}
exports.UserBlogCreateController = UserBlogCreateController;
//# sourceMappingURL=UserBlogCreateController.js.map
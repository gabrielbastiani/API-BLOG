"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeleteService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class UserDeleteService {
    async execute({ id_delete, name, user_id }) {
        const users = await prisma_1.default.user.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        users.forEach((user) => {
            if (user.image_user) {
                const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + user.image_user);
                fs_1.default.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image for user ${user.id}: ${err.message}`);
                    }
                    else {
                        console.log(`Image for user ${user.id} deleted successfully`);
                    }
                });
            }
        });
        const deletedUsers = await prisma_1.default.user.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });
        await prisma_1.default.notificationUser.createMany({
            data: users.map((user) => ({
                user_id: user_id,
                message: `Usuário ${user.name} foi deletado pelo usuário ${name}.`,
                type: "user"
            }))
        });
        return deletedUsers;
    }
}
exports.UserDeleteService = UserDeleteService;
//# sourceMappingURL=UserDeleteService.js.map
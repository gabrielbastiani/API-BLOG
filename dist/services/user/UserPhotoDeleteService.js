"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPhotoDeleteService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class UserPhotoDeleteService {
    async execute({ user_id }) {
        const user_photo = await prisma_1.default.user.findUnique({
            where: {
                id: user_id
            }
        });
        const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + user_photo?.image_user);
        fs_1.default.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Failed to delete old image: ${err.message}`);
            }
            else {
                console.log('Old image deleted successfully');
            }
        });
        const user = await prisma_1.default.user.update({
            where: {
                id: user_id
            },
            data: {
                image_user: ""
            }
        });
        return user;
    }
}
exports.UserPhotoDeleteService = UserPhotoDeleteService;
//# sourceMappingURL=UserPhotoDeleteService.js.map
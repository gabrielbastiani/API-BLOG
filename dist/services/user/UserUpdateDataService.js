"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateDataService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcryptjs_1 = require("bcryptjs");
class UserUpdateDataService {
    async execute({ user_id, name, email, image_user, role, status, password }) {
        function removerAcentos(s) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: user_id }
        });
        if (!user) {
            throw new Error("User not found");
        }
        const dataToUpdate = {};
        if (name) {
            dataToUpdate.name = name;
            dataToUpdate.slug_name = removerAcentos(name);
        }
        if (email) {
            const userAlreadyExists = await prisma_1.default.user.findFirst({
                where: {
                    email: email,
                    id: { not: user_id }
                }
            });
            if (userAlreadyExists) {
                throw new Error("User already exists");
            }
            dataToUpdate.email = email;
        }
        if (image_user) {
            if (user.image_user) {
                const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + user.image_user);
                fs_1.default.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old image: ${err.message}`);
                    }
                    else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            dataToUpdate.image_user = image_user;
        }
        if (role) {
            dataToUpdate.role = role;
        }
        if (status) {
            dataToUpdate.status = status;
        }
        if (password) {
            const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
            dataToUpdate.password = hashedPassword;
        }
        const update_user = await prisma_1.default.user.update({
            where: {
                id: user_id
            },
            data: dataToUpdate
        });
        return update_user;
    }
}
exports.UserUpdateDataService = UserUpdateDataService;
//# sourceMappingURL=UserUpdateDataService.js.map
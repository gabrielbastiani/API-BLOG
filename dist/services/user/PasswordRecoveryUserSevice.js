"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoveryUserSevice = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class PasswordRecoveryUserSevice {
    async execute({ passwordRecoveryUser_id, password }) {
        const recovery = await prisma_1.default.passwordRecoveryUser.findUnique({
            where: {
                id: passwordRecoveryUser_id
            },
        });
        if (!recovery) {
            throw {
                error: { message: "Conta não encontrada." },
                code: 400,
            };
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
        await prisma_1.default.user.update({
            where: {
                email: recovery.email,
            },
            data: {
                password: hashedPassword,
            },
        });
        await prisma_1.default.passwordRecoveryUser.delete({
            where: {
                id: recovery.id,
            },
        });
        return {
            message: "Senha atualizada com sucesso",
        };
    }
}
exports.PasswordRecoveryUserSevice = PasswordRecoveryUserSevice;
//# sourceMappingURL=PasswordRecoveryUserSevice.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperUserPublicService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class SuperUserPublicService {
    async execute() {
        const user = await prisma_1.default.user.findMany({
            where: {
                role: client_1.RoleUser.SUPER_ADMIN
            }
        });
        return user;
    }
}
exports.SuperUserPublicService = SuperUserPublicService;
//# sourceMappingURL=SuperUserPublicService.js.map
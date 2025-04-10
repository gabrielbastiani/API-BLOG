"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class ThemeService {
    async getThemeSettings() {
        const settings = await prisma_1.default.themeSettings.findFirst();
        return settings?.colors || {};
    }
    async updateThemeSettings(colors) {
        const existing = await prisma_1.default.themeSettings.findFirst();
        if (existing) {
            return await prisma_1.default.themeSettings.update({
                where: { id: existing.id },
                data: { colors }
            });
        }
    }
}
exports.ThemeService = ThemeService;
//# sourceMappingURL=ThemeService.js.map
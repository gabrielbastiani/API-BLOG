"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeController = void 0;
const ThemeService_1 = require("../../../services/configuration_blog/theme_setting/ThemeService");
const validation_result_1 = require("express-validator/lib/validation-result");
class ThemeController {
    async getTheme(req, res) {
        try {
            const themeService = new ThemeService_1.ThemeService();
            const colors = await themeService.getThemeSettings();
            return res.json({ colors });
        }
        catch (error) {
            return res.status(500).json({ error: 'Erro interno' });
        }
    }
    async updateTheme(req, res) {
        const errors = (0, validation_result_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { colors } = req.body;
            const themeService = new ThemeService_1.ThemeService();
            await themeService.updateThemeSettings(colors);
            return res.json({ colors });
        }
        catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar' });
        }
    }
}
exports.ThemeController = ThemeController;
//# sourceMappingURL=ThemeController.js.map
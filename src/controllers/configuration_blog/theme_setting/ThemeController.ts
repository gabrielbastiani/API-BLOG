import { Request, Response } from 'express';
import { ThemeService } from '../../../services/configuration_blog/theme_setting/ThemeService';
import { validationResult } from 'express-validator/lib/validation-result';

class ThemeController {
    async getTheme(req: Request, res: Response) {
        try {
            const themeService = new ThemeService();
            const themeSettings = await themeService.getThemeSettings();
            return res.json(themeSettings);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateTheme(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const themeData = req.body;
            const themeService = new ThemeService();
            const updatedTheme = await themeService.updateThemeSettings(themeData);
            return res.json(updatedTheme);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export { ThemeController };
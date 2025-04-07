import { JsonObject } from "@prisma/client/runtime/library";
import prismaClient from "../../../prisma";

class ThemeService {
    async getThemeSettings() {
        const settings = await prismaClient.themeSettings.findFirst();
        return settings?.colors || {};
    }

    async updateThemeSettings(colors: Record<string, string>) {
        const existing = await prismaClient.themeSettings.findFirst();

        if (existing) {
            return await prismaClient.themeSettings.update({
                where: { id: existing.id },
                data: { colors }
            });
        }

        return await prismaClient.themeSettings.create({
            data: { colors }
        });
    }

    async deleteColor(colorName: string) {
        const existingSettings = await prismaClient.themeSettings.findFirst();
        
        if (!existingSettings) {
            throw new Error('Configurações de tema não encontradas');
        }

        const colors = typeof existingSettings.colors === 'object' 
            ? existingSettings.colors as JsonObject
            : {};

        const updatedColors = { ...colors };
        delete updatedColors[colorName];

        return await prismaClient.themeSettings.update({
            where: { id: existingSettings.id },
            data: { colors: updatedColors }
        });
    }
}

export { ThemeService };
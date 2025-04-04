import prismaClient from "../../../prisma";

interface ThemeRequest {
    primaryColor?: string;
    secondaryColor?: string;
    thirdColor?: string;
    fourthColor?: string;
    fifthColor?: string;
    sixthColor?: string;
    primarybackgroundColor?: string;
    secondarybackgroundColor?: string;
    thirdbackgroundColor?: string;
    fourthbackgroundColor?: string;
}

class ThemeService {
    async getThemeSettings() {
        return await prismaClient.themeSettings.findFirst();
    }

    async updateThemeSettings(themeData: ThemeRequest) {
        const existingSettings = await prismaClient.themeSettings.findFirst();

        if (existingSettings) {
            return await prismaClient.themeSettings.update({
                where: { id: existingSettings.id },
                data: themeData
            });
        }

        return await prismaClient.themeSettings.create({
            data: themeData
        });
    }
}

export { ThemeService };
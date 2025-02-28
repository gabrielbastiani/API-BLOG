import prismaClient from '../../../prisma';
import fs from 'fs/promises';
import path from 'path';

// Caminho absoluto corrigido para a pasta de imagens
const IMAGE_UPLOAD_DIR = path.join(process.cwd(), 'images'); // Alterado para 'images'

interface SeoProps {
    sEOSettings_id: string;
    page?: string;
    title?: string;
    description?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImages?: string[];
    ogImageIndexes?: number[];
    ogImageWidth?: number;
    ogImageHeight?: number;
    ogImageAlt?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterCreator?: string;
    twitterImages?: string[];
    twitterImageIndexes?: number[];
}

class UpdateSeoSettingsService {
    async execute({
        sEOSettings_id,
        ...updateData
    }: SeoProps) {

        const currentSettings = await prismaClient.sEOSettings.findUnique({
            where: { id: sEOSettings_id }
        });

        if (!currentSettings) {
            throw new Error("Configuração SEO não encontrada");
        }

        // Extrair e validar índices
        const { 
            ogImageIndexes = [],
            twitterImageIndexes = [],
            ...prismaUpdateData
        } = updateData;

        // Processar exclusões primeiro
        await this.processDeletions(
            currentSettings.ogImages as string[],
            ogImageIndexes,
            'OG'
        );

        await this.processDeletions(
            currentSettings.twitterImages as string[],
            twitterImageIndexes,
            'Twitter'
        );

        // Processar novas imagens
        const updatedOgImages = this.processNewImages(
            currentSettings.ogImages as string[],
            updateData.ogImages || [],
            ogImageIndexes
        );

        const updatedTwitterImages = this.processNewImages(
            currentSettings.twitterImages as string[],
            updateData.twitterImages || [],
            twitterImageIndexes
        );

        // Montar dados para atualização
        const dataToUpdate = {
            ...prismaUpdateData,
            ogImages: updatedOgImages,
            twitterImages: updatedTwitterImages,
            ogImageWidth: updateData.ogImageWidth ? Number(updateData.ogImageWidth) : undefined,
            ogImageHeight: updateData.ogImageHeight ? Number(updateData.ogImageHeight) : undefined,
        };

        return await prismaClient.sEOSettings.update({
            where: { id: sEOSettings_id },
            data: dataToUpdate
        });
    }

    private async processDeletions(
        currentImages: string[],
        indexes: number[],
        type: string
    ): Promise<void> {
        const validIndexes = this.validateIndexes(currentImages, indexes);
        
        await Promise.all(
            validIndexes.map(async (index) => {
                const filename = currentImages[index];
                if (filename) {
                    try {
                        const imagePath = path.join(IMAGE_UPLOAD_DIR, filename);
                        console.log(`[${type}] Tentando deletar: ${imagePath}`); // Log detalhado
                        await fs.access(imagePath);
                        await fs.unlink(imagePath);
                        console.log(`[${type}] ✓ Arquivo ${filename} deletado`);
                    } catch (error: any) {
                        if (error.code === 'ENOENT') {
                            console.log(`[${type}] ! Arquivo ${filename} não encontrado`);
                        } else {
                            console.error(`[${type}] ✗ Erro ao deletar ${filename}:`, error);
                            throw new Error(`Falha ao deletar imagem: ${filename}`);
                        }
                    }
                }
            })
        );
    }

    private processNewImages(
        currentImages: string[],
        newImages: string[],
        indexes: number[]
    ): string[] {
        const updatedImages = [...currentImages];
        const validIndexes = this.validateIndexes(currentImages, indexes);

        if (newImages.length > validIndexes.length) {
            throw new Error(`${newImages.length} novas imagens para ${validIndexes.length} índices`);
        }

        newImages.forEach((image, i) => {
            const targetIndex = validIndexes[i] ?? updatedImages.length;
            if (targetIndex < updatedImages.length) {
                updatedImages[targetIndex] = image;
            } else {
                updatedImages.push(image);
            }
        });

        return updatedImages;
    }

    private validateIndexes(currentImages: string[], indexes: number[]): number[] {
        return indexes
            .filter(index => 
                Number.isInteger(index) &&
                index >= 0 &&
                index < currentImages.length
            )
            .filter((value, index, self) => self.indexOf(value) === index);
    }
}

export { UpdateSeoSettingsService }
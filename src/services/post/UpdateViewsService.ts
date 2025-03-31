import { Request } from "express";
import prismaClient from "../../prisma";
import { getClientIp } from "../../middlewares/getClientIp";

function normalizeIp(ip: string): string {
    if (ip === '::1') return '127.0.0.1';
    return ip.split(':').pop() || ip; // Remove prefixos IPv6
}

class UpdateViewsService {
    async execute({ post_id, req }: { post_id: string; req: Request }) {
        const rawIp = getClientIp(req);
        const ipAddress = normalizeIp(rawIp);

        // Verificação simultânea de existência e atualização
        const [existingView, updatedPost] = await prismaClient.$transaction([
            prismaClient.postView.findFirst({
                where: {
                    post_id,
                    ipAddress,
                },
            }),
            prismaClient.post.update({
                where: { id: post_id },
                data: { views: { increment: 1 } },
                select: { views: true }
            })
        ]);

        if (existingView) {
            await prismaClient.post.update({
                where: { id: post_id },
                data: { views: { decrement: 1 } }, // Reverte o incremento
            });
            return { message: "View already counted" };
        }

        await prismaClient.postView.create({
            data: {
                post_id,
                ipAddress,
            },
        });

        return {
            message: "View successfully counted",
            views: updatedPost.views
        };
    }
}

export { UpdateViewsService };
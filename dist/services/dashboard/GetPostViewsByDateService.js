"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostViewsByDateService = void 0;
const moment_1 = __importDefault(require("moment"));
const prisma_1 = __importDefault(require("../../prisma"));
class GetPostViewsByDateService {
    async execute(startDate, endDate) {
        const postViewsRaw = await prisma_1.default.postView.findMany({
            where: {
                created_at: {
                    gte: (0, moment_1.default)(startDate).startOf('day').toISOString(),
                    lte: (0, moment_1.default)(endDate).endOf('day').toISOString()
                },
            },
            select: {
                post_id: true,
                created_at: true,
                post: { select: { title: true } }, // Busca o título do post
            },
        });
        const formattedData = [];
        const viewMap = {}; // Para armazenar os dados temporariamente
        postViewsRaw.forEach(({ created_at, post }) => {
            const date = created_at.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD
            if (!viewMap[date])
                viewMap[date] = {}; /* @ts-ignore */
            if (!viewMap[date][post.title])
                viewMap[date][post.title] = 0; // Inicializa o contador de views
            /* @ts-ignore */
            viewMap[date][post.title] += 1; // Incrementa o contador de views
        });
        // Converte os dados para o formato final
        Object.entries(viewMap).forEach(([date, posts]) => {
            Object.entries(posts).forEach(([title, views]) => {
                formattedData.push({ date, title, views });
            });
        });
        return formattedData;
    }
}
exports.GetPostViewsByDateService = GetPostViewsByDateService;
//# sourceMappingURL=GetPostViewsByDateService.js.map
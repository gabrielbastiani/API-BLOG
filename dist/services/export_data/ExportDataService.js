"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportDataService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const XLSX = __importStar(require("xlsx"));
class ExportDataService {
    async execute(user_id, tableName, columns, format, customColumnNames) {
        try {
            const filter = tableName === 'user'
                ? {
                    role: { in: ["ADMIN", "EMPLOYEE"] },
                    id: { not: user_id },
                }
                : {};
            const queryOptions = {
                where: filter,
            };
            // Ajustando lógica de busca para a tabela 'comment'
            let dataExport = [];
            if (tableName === 'comment') {
                // Se o 'comment' estiver sendo exportado, inclui apenas as colunas necessárias
                dataExport = await prisma_1.default.comment.findMany({
                    include: {
                        post: { select: { title: true } },
                        userBlog: { select: { name: true } },
                        replies: { select: { comment: true } },
                    },
                });
            }
            else {
                // Se a tabela não for 'comment', inclui apenas as colunas selecionadas
                if (tableName === 'category') {
                    // Se o 'category' estiver sendo exportado, inclui apenas as colunas necessárias
                    dataExport = await prisma_1.default.category.findMany({
                        include: {
                            children: { select: { name_category: true } }
                        }
                    });
                }
                if (columns.length > 0) {
                    queryOptions.select = columns.reduce((acc, col) => ({ ...acc, [col]: true }), {});
                } /* @ts-ignore */
                dataExport = await prisma_1.default[tableName].findMany(queryOptions);
            }
            if (!dataExport || dataExport.length === 0) {
                throw new Error('Nenhum dado encontrado para exportação.');
            }
            const formattedData = await Promise.all(dataExport.map(async (item) => {
                const formattedItem = {};
                // Preencher apenas as colunas selecionadas
                columns.forEach((col) => {
                    formattedItem[customColumnNames[col] || col] = item[col];
                });
                if (tableName === 'comment') {
                    // Verificar se as colunas relacionadas a 'comment' estão selecionadas antes de adicionar
                    if (columns.includes('post')) {
                        formattedItem['Título do Post'] = item.post?.title || 'Sem Título';
                    }
                    if (columns.includes('userBlog')) {
                        formattedItem['Nome do Usuário'] = item.userBlog?.name || 'Sem Nome';
                    }
                    if (columns.includes('replies')) {
                        formattedItem['Respostas'] = item.replies.length > 0
                            ? item.replies.map((reply) => reply.comment).join(', ')
                            : 'Sem Respostas';
                    }
                }
                if (tableName === 'category') {
                    if (columns.includes('children')) {
                        formattedItem['Subcategorias'] = item.children.length > 0
                            ? item.children.map((child) => child.name_category).join(', ')
                            : 'Sem Dados';
                    }
                }
                if (tableName === 'post' && item.categories && item.tags) {
                    const categoryIds = item.categories.map((cat) => cat.category_id);
                    const tagIds = item.tags.map((tag) => tag.tag_id);
                    const categories = await prisma_1.default.category.findMany({
                        where: { id: { in: categoryIds } },
                        select: { name_category: true }
                    });
                    const tags = await prisma_1.default.tag.findMany({
                        where: { id: { in: tagIds } },
                        select: { tag_name: true }
                    });
                    if (columns.includes('categories')) {
                        formattedItem['Categorias do post'] = categories.map((cat) => cat.name_category).join(', ') || 'Sem Categorias';
                    }
                    if (columns.includes('tags')) {
                        formattedItem['Tags do post'] = tags.map((tag) => tag.tag_name).join(', ') || 'Sem Tags';
                    }
                }
                return formattedItem;
            }));
            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            const buffer = format === 'xlsx'
                ? XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })
                : XLSX.write(workbook, { bookType: 'csv', type: 'buffer' });
            await prisma_1.default.notificationUser.create({
                data: {
                    user_id: user_id,
                    message: "Planilha de dados exportada com sucesso.",
                    type: "export_data",
                }
            });
            return {
                buffer,
                mimeType: format === 'xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'text/csv',
                extension: format,
            };
        }
        catch (error) {
            console.error('Erro durante a exportação:', error); /* @ts-ignore */
            throw new Error(`Erro durante a exportação: ${error.message}`);
        }
    }
}
exports.ExportDataService = ExportDataService;
//# sourceMappingURL=ExportDataService.js.map
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
exports.BulkDeleteMarketingPublicationService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const XLSX = __importStar(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
class BulkDeleteMarketingPublicationService {
    async execute(filePath, user_id) {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            const publicationToDelete = data
                .map(publication => publication.Nome)
                .filter(title => title !== undefined && title !== null);
            const publications = await prisma_1.default.marketingPublication.findMany({
                where: {
                    title: {
                        in: publicationToDelete
                    }
                }
            });
            const users_crate = await prisma_1.default.user.findUnique({
                where: {
                    id: user_id
                }
            });
            const users_superAdmins = await prisma_1.default.user.findMany({
                where: {
                    role: client_1.RoleUser.SUPER_ADMIN
                }
            });
            const all_user_ids = [
                ...users_superAdmins.map(user => user.id)
            ];
            const notificationsData = all_user_ids.map(user_id => ({
                user_id,
                message: `Publicação de marketing deletada(s) via planilha pelo usuario ${users_crate?.name}`,
                type: "marketing"
            }));
            publications.forEach((publication) => {
                if (publication.image_url) {
                    const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + publication.image_url);
                    fs_1.default.unlink(imagePath, (err) => {
                        if (err) {
                            console.error(`Failed to delete image for publication ${publication.id}: ${err.message}`);
                        }
                        else {
                            console.log(`Image for marketingPublication ${publication.id} deleted successfully`);
                        }
                    });
                }
            });
            const delete_publications = await prisma_1.default.marketingPublication.deleteMany({
                where: {
                    title: { in: publicationToDelete },
                },
            });
            await prisma_1.default.notificationUser.createMany({
                data: notificationsData
            });
            return delete_publications;
        }
        finally {
            if (fs_1.default.existsSync(filePath)) {
                fs_1.default.unlinkSync(filePath);
            }
        }
    }
}
exports.BulkDeleteMarketingPublicationService = BulkDeleteMarketingPublicationService;
//# sourceMappingURL=BulkDeleteMarketingPublicationService.js.map
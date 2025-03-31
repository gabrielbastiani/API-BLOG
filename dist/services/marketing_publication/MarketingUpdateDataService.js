"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingUpdateDataService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class MarketingUpdateDataService {
    async execute({ marketingPublication_id, title, description, image_url, status, text_button, redirect_url, publish_at_start, publish_at_end, position, conditions, popup_time, text_publication, local }) {
        const marketingPublication = await prisma_1.default.marketingPublication.findUnique({
            where: { id: marketingPublication_id }
        });
        const dataToUpdate = {};
        if (title) {
            dataToUpdate.title = title;
        }
        if (local) {
            dataToUpdate.local = local;
        }
        if (conditions) {
            dataToUpdate.conditions = conditions;
        }
        if (text_button) {
            dataToUpdate.text_button = text_button;
        }
        if (popup_time) {
            dataToUpdate.popup_time = Number(popup_time);
        }
        if (position) {
            dataToUpdate.position = position;
        }
        if (description) {
            dataToUpdate.description = description;
        }
        if (!description) {
            dataToUpdate.description = "";
        }
        if (text_publication) {
            dataToUpdate.text_publication = text_publication;
        }
        if (!text_publication) {
            dataToUpdate.text_publication = "";
        }
        if (image_url) {
            if (marketingPublication?.image_url) {
                const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + marketingPublication?.image_url);
                fs_1.default.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old image: ${err.message}`);
                    }
                    else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            dataToUpdate.image_url = image_url;
        }
        if (status) {
            if (status === "Programado") {
                dataToUpdate.is_completed = false,
                    dataToUpdate.email_sent = false;
            }
            dataToUpdate.status = status;
        }
        if (redirect_url) {
            dataToUpdate.redirect_url = redirect_url;
        }
        if (publish_at_start) {
            dataToUpdate.publish_at_start = publish_at_start ? new Date(publish_at_start).toISOString() : null;
        }
        if (publish_at_end) {
            dataToUpdate.publish_at_end = publish_at_end ? new Date(publish_at_end).toISOString() : null;
        }
        const update_publications = await prisma_1.default.marketingPublication.update({
            where: {
                id: marketingPublication_id
            },
            data: dataToUpdate
        });
        return update_publications;
    }
}
exports.MarketingUpdateDataService = MarketingUpdateDataService;
//# sourceMappingURL=MarketingUpdateDataService.js.map
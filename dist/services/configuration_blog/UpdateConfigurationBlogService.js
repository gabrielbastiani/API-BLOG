"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfigurationBlogService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class UpdateConfigurationBlogService {
    async execute({ configurationBlog_id, name_blog, description_blog, logo, favicon, phone, email_blog, author_blog, about_author_blog, privacy_policies }) {
        const configurationBlog = await prisma_1.default.configurationBlog.findUnique({
            where: { id: configurationBlog_id }
        });
        const dataToUpdate = {};
        if (name_blog) {
            dataToUpdate.name_blog = name_blog;
        }
        if (privacy_policies) {
            dataToUpdate.privacy_policies = privacy_policies;
        }
        if (description_blog) {
            dataToUpdate.description_blog = description_blog;
        }
        if (about_author_blog) {
            dataToUpdate.about_author_blog = about_author_blog;
        }
        if (logo) {
            if (configurationBlog?.logo) {
                const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + configurationBlog?.logo);
                console.log(`Deleting image: ${imagePath}`);
                fs_1.default.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old image: ${err.message}`);
                    }
                    else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            dataToUpdate.logo = logo;
        }
        if (favicon) {
            if (configurationBlog?.favicon) {
                const imagePath = path_1.default.resolve(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + configurationBlog?.favicon);
                console.log(`Deleting image: ${imagePath}`);
                fs_1.default.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete old image: ${err.message}`);
                    }
                    else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            dataToUpdate.favicon = favicon;
        }
        if (phone) {
            dataToUpdate.phone = phone;
        }
        if (email_blog) {
            dataToUpdate.email_blog = email_blog;
        }
        if (author_blog) {
            dataToUpdate.author_blog = author_blog;
        }
        const update_Configs = await prisma_1.default.configurationBlog.update({
            where: {
                id: configurationBlog_id
            },
            data: dataToUpdate
        });
        return update_Configs;
    }
}
exports.UpdateConfigurationBlogService = UpdateConfigurationBlogService;
//# sourceMappingURL=UpdateConfigurationBlogService.js.map
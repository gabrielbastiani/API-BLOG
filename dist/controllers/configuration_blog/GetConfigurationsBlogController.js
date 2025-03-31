"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConfigurationsBlogController = void 0;
const GetConfigurationsBlogService_1 = require("../../services/configuration_blog/GetConfigurationsBlogService");
class GetConfigurationsBlogController {
    async handle(req, res) {
        const configs = new GetConfigurationsBlogService_1.GetConfigurationsBlogService();
        const blog = await configs.execute();
        return res.json(blog);
    }
}
exports.GetConfigurationsBlogController = GetConfigurationsBlogController;
//# sourceMappingURL=GetConfigurationsBlogController.js.map
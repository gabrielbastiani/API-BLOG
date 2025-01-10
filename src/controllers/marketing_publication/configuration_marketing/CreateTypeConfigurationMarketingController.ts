import { Request, Response } from "express";
import { CreateTypeConfigurationMarketingService } from "../../../services/marketing_publication/configuration_marketing/CreateTypeConfigurationMarketingService"; 

class CreateTypeConfigurationMarketingController {
    async handle(req: Request, res: Response) {
        const {
            name,
            description,
            banner_interval
        } = req.body;

        const createConfiguration = new CreateTypeConfigurationMarketingService();

        const marketing = await createConfiguration.execute({
            name,
            description,
            banner_interval
        });

        return res.status(201).json(marketing);
    }
}

export { CreateTypeConfigurationMarketingController };
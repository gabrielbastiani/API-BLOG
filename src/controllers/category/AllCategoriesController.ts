import { Request, Response } from "express";
import { AllCategoriesService } from "../../services/category/AllCategoriesService"; 
import { Prisma } from "@prisma/client";

class AllCategoriesController {
    async handle(req: Request, res: Response) {
        const { 
            page = 1, 
            limit = 5, 
            search = "", 
            orderBy = "created_at", 
            orderDirection = "desc",
            startDate,
            endDate
        } = req.query;

        const allContacts = new AllCategoriesService();
        const contacts = await allContacts.execute(
            Number(page),
            Number(limit),
            String(search),
            String(orderBy),
            orderDirection as Prisma.SortOrder,
            startDate ? String(startDate) : undefined,
            endDate ? String(endDate) : undefined
        );

        return res.json(contacts);
    }
}

export { AllCategoriesController };
import { StatusCategory } from "@prisma/client";
import prismaClient from "../../prisma";

class SitemapCategoryService {
  async execute() {
    const data_category = await prismaClient.category.findMany({
      where: {
        status: StatusCategory.Disponivel
      }
    });

    return data_category;
  }
}

export { SitemapCategoryService };
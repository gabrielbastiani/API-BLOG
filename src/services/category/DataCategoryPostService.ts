import prismaClient from "../../prisma";

interface CategProps {
  slug_name_category: string;
}

class DataCategoryPostService {
  async execute({ slug_name_category }: CategProps) {
    const data_category = await prismaClient.category.findFirst({
      where: {
        slug_name_category: slug_name_category
      }
    });

    return data_category;
  }
}

export { DataCategoryPostService };
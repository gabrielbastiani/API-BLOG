<<<<<<< HEAD
import prismaClient from "../../prisma";
import { StatusCategory } from "@prisma/client";

class CategoriesBlogService {
  async execute() {
    const all_categories = await prismaClient.category.findMany({
      where: { status: StatusCategory.Disponivel },
      orderBy: { created_at: "desc" },
      include: {
        children: {
          where: { status: StatusCategory.Disponivel },
          select: {
            id: true,
            slug_name_category: true,
            name_category: true
          }
        }
      }
    });

    return all_categories;
  }
}

=======
import prismaClient from "../../prisma";
import { StatusCategory } from "@prisma/client";

class CategoriesBlogService {
  async execute() {
    const all_categories = await prismaClient.category.findMany({
      where: { status: StatusCategory.Disponivel },
      orderBy: { created_at: "desc" },
      include: {
        children: {
          where: { status: StatusCategory.Disponivel },
          select: {
            id: true,
            slug_name_category: true,
            name_category: true
          }
        }
      }
    });

    return all_categories;
  }
}

>>>>>>> a1dcb2e4d383c73addf2ba89ceb9697537099208
export { CategoriesBlogService };
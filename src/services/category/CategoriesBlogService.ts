import prismaClient from "../../prisma";
import { StatusCategory } from "@prisma/client";

class CategoriesBlogService {
  async execute() {
    const all_categories = await prismaClient.category.findMany({
      where: {
        status: StatusCategory.Disponivel
      },
      orderBy: { created_at: "desc" },
      include: {
        children: {
          include: {
            parent: {
              include: {
                children: {
                  include: {
                    parent: {
                      include: {
                        children: {
                          include: {
                            parent: {
                              include: {
                                children: {
                                  include: {
                                    parent: {
                                      include: {
                                        children: {
                                          include: {
                                            parent: true
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    return all_categories;

  }
}

export { CategoriesBlogService };
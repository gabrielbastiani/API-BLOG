import prismaClient from "../../prisma";
import { Prisma, StatusPost } from "@prisma/client";

class NavBarSearchBlogPostService {
  async execute(
    search: string = ""
  ) {
    const whereClause: Prisma.PostWhereInput = {
      status: StatusPost.Disponivel,
      ...(
        search ? {
          OR: [
            { author: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ]
        } : {}
      )
    };

    const all_posts = await prismaClient.post.findMany({
      where: whereClause,
      include: {
        categories: {
          include: {
            category: true
          }
        },
        tags: {
          include: {
            tag: true
          }
        },
        comment: true
      }
    });

    return all_posts;

  }
}

export { NavBarSearchBlogPostService };
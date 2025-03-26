import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

class PostsCategoryService {
  async execute(
    slug_name_category: string,
    page: number = 1,
    limit: number = 6,
    search: string = "",
    orderBy: string = "created_at",
    orderDirection: Prisma.SortOrder = "desc"
  ) {

    const skip = (page - 1) * limit;

    const whereClause: Prisma.PostWhereInput = {
      AND: [
        {
          categories: {
            some: {
              category: {
                slug_name_category,
              },
            },
          },
        },
        {
          status: {
            notIn: ["Programado", "Indisponivel"]
          }
        },
        ...(search
          ? [
            {
              OR: [
                {
                  text_post: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  title: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            },
          ]
          : []),
      ],
    };

    const all_posts = await prismaClient.post.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { [orderBy]: orderDirection },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    const total_posts = await prismaClient.post.count({
      where: whereClause,
    });

    // -- UNIQUE CATEGORY -- //
    const data_category = await prismaClient.category.findFirst({
      where: {
        slug_name_category: slug_name_category
      }
    });

    return {
      data_category: data_category,
      posts: all_posts,
      currentPage: page,
      totalPages: Math.ceil(total_posts / limit),
      totalPosts: total_posts,
    };
  }
}

export { PostsCategoryService };
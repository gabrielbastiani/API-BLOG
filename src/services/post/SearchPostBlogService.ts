import moment from "moment";
import prismaClient from "../../prisma";
import { Prisma, StatusPost } from "@prisma/client";

class SearchPostBlogService {
  async execute(
    post_id?: string,
    page: number = 1,
    limit: number = 6,
    search: string = "",
    orderBy: string = "created_at",
    orderDirection: Prisma.SortOrder = "desc",
    startDate?: string,
    endDate?: string
  ) {
    const skip = (page - 1) * limit;

    const whereClause: Prisma.PostWhereInput = {
      status: StatusPost.Disponivel,
      ...(
        search ? {
          OR: [
            { text_post: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ]
        } : {}
      ),
      ...(
        startDate && endDate ? {
          created_at: {
            gte: moment(startDate).startOf('day').toISOString(),
            lte: moment(endDate).endOf('day').toISOString(),
          }
        } : {}
      )
    };

    const all_posts = await prismaClient.post.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { [orderBy]: orderDirection },
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

    const total_posts = await prismaClient.post.count({
      where: whereClause,
    });

    // --- UNIQUE POST ---//

    let post_unique = null;

    if (post_id) {
      post_unique = await prismaClient.post.findUnique({
        where: {
          id: post_id,
          status: StatusPost.Disponivel
        },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    }

    return {
      unique_post: post_unique,
      posts: all_posts,
      currentPage: page,
      totalPages: Math.ceil(total_posts / limit),
      totalPosts: total_posts,
    };
  }
}

export { SearchPostBlogService };
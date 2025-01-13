import prismaClient from "../../prisma";
import { Prisma, StatusPost } from "@prisma/client";

class SearchPostBlogService {
  async execute(
    post_id?: string,
    page: number = 1,
    limit: number = 6,
    search: string = "",
    orderBy: string = "created_at",
    orderDirection: Prisma.SortOrder = "desc"
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
      )
    };

    const all_posts = await prismaClient.post.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { [orderBy]: orderDirection }
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

    // --- LAST POST ---
    const last_post = await prismaClient.post.findMany({
      where: {
        status: StatusPost.Disponivel,
      },
      orderBy: [
        { publish_at: "asc" },
        { created_at: "asc" },
      ],
    });

    // --- MOST VIEWS POST ---
    const most_views_post = await prismaClient.post.findMany({
      where: {
        status: StatusPost.Disponivel,
      },
      orderBy: {
        views: "desc"
      }
    });

    return {
      most_views_post: most_views_post,
      last_post: last_post,
      unique_post: post_unique,
      posts: all_posts,
      currentPage: page,
      totalPages: Math.ceil(total_posts / limit),
      totalPosts: total_posts,
    };
  }
}

export { SearchPostBlogService };
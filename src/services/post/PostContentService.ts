import prismaClient from "../../prisma";

interface PostProps {
  url_post: string;
}

class PostContentService {
  async execute({ url_post }: PostProps) {
    const post = await prismaClient.post.findFirst({
      where: {
        OR: [
          { custom_url: url_post },
          { slug_title_post: url_post }
        ]
      },
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
        comment: {
          include: {
            replies: true,
            userBlog: true
          }
        }
      }
    });

    return post;
  }
}

export { PostContentService };
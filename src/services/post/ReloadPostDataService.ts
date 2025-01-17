import prismaClient from "../../prisma";

interface PostProps {
  post_id: string;
}

class ReloadPostDataService {
  async execute({ post_id }: PostProps) {
    const post = await prismaClient.post.findFirst({
      where: {
        id: post_id
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

export { ReloadPostDataService };
import prismaClient from "../../prisma";

class PostSEOContentService {
  async execute() {
    const post = await prismaClient.post.findMany({
      where: {
        status: "Disponivel"
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

export { PostSEOContentService };
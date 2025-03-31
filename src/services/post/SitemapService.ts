import { StatusPost } from "@prisma/client";
import prismaClient from "../../prisma";

class SitemapService {
  async execute() {
    const post = await prismaClient.post.findMany({
      where: {
        status: StatusPost.Disponivel
      }
    });

    return post;
  }
}

export { SitemapService };
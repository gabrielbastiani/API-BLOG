import prismaClient from "../../../prisma"; 

interface UserRequest {
    user_id: string;
}

class UserBlogDetailService {
    async execute({ user_id }: UserRequest) {
        const user = await prismaClient.userBlog.findFirst({
            where: {
                id: user_id
            },
            select: {
                created_at: true,
                email: true,
                id: true,
                image_user: true,
                name: true,
                slug_name: true,
                status: true
            }
        });

        return user;

    }
}

export { UserBlogDetailService }
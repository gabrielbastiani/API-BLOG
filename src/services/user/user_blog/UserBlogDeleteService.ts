import prismaClient from "../../../prisma";

interface UserRequest {
    id_delete: string[];
    name?: string;
    user_id?: string;
}

class UserBlogDeleteService {
    async execute({ id_delete, name, user_id }: UserRequest) {

        const users = await prismaClient.userBlog.findMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        const deletedUsers = await prismaClient.userBlog.deleteMany({
            where: {
                id: {
                    in: id_delete
                }
            }
        });

        await prismaClient.notificationUser.createMany({
            data: users.map((user) => ({
                user_id: user_id,
                message: `Usuário do blog ${user.name} foi deletado pelo usuário ${name}.`,
                type: "user"
            }))
        });

        return deletedUsers;
    }
}

export { UserBlogDeleteService };
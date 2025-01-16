import prismaClient from "../../../prisma"; 

interface MediaProps {
    name_media: string;
    link: string;
    logo_media: string;
}

class CreateMediaSocialBlogService {
    async execute({ name_media, link, logo_media }: MediaProps) {

        const config = await prismaClient.socialMediasBlog.create({
            data: {
                name_media: name_media,
                link: link,
                logo_media: logo_media
            }
        })

        return config;

    }
}

export { CreateMediaSocialBlogService }
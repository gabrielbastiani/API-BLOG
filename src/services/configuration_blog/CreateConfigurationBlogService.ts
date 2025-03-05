import prismaClient from "../../prisma";

interface ConfigBlog {
    name_blog: string;
    email_blog: string;
    logo: string;
    favicon?: string;
}

class CreateConfigurationBlogService {
    async execute({ name_blog, email_blog, logo, favicon }: ConfigBlog) {

        const config = await prismaClient.configurationBlog.create({
            data: {
                name_blog: name_blog,
                email_blog: email_blog,
                logo: logo,
                favicon: favicon,
                phone: "(99) 99999-9999",
                description_blog: "Escreva uma descrição para o blog, do que se trata...",
                author_blog: "Nome do(a) dono(a) do blog",
                about_author_blog: "Sobre o autor do blog",
                privacy_policies: "Escrveva aqui seu texto das suas politicas de privacidades focado na lei LGPD"
            }
        })

        return config;

    }
}

export { CreateConfigurationBlogService }
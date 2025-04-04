import { RoleUser, StatusUser } from '@prisma/client';
import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';
import nodemailer from "nodemailer";
require('dotenv/config');
import ejs from 'ejs';
import path from "path";

interface UserRequest {
    name: string;
    email: string;
    image_user?: string;
    password: string;
    role?: string;
    send_email?: boolean;
}

class UserCreateService {
    async execute({ name, email, password, image_user, role, send_email }: UserRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const first_super_user = await prismaClient.user.findFirst({
            where: {
                role: RoleUser.SUPER_ADMIN
            }
        });

        if (first_super_user) {
            const user_create = await prismaClient.user.create({
                data: {
                    name: name,
                    slug_name: removerAcentos(name),
                    email: email,
                    image_user: image_user,
                    password: passwordHash,
                    role: role as RoleUser,
                    status: StatusUser.Disponivel
                }
            });

            const transporter = nodemailer.createTransport({
                host: process.env.HOST_SMTP,
                port: 465,
                auth: {
                    user: process.env.USER_SMTP,
                    pass: process.env.PASS_SMTP
                }
            });

            const users_superAdmins = await prismaClient.user.findMany({
                where: {
                    role: RoleUser.SUPER_ADMIN
                }
            });

            const all_user_ids = [
                ...users_superAdmins.map(user => user.id)
            ];

            const notificationsData = all_user_ids.map(user_id => ({
                user_id,
                message: "Usuário criado com sucesso",
                type: "user"
            }));

            await prismaClient.notificationUser.createMany({
                data: notificationsData
            });

            const infos_blog = await prismaClient.configurationBlog.findFirst();
            const requiredPath = path.join(__dirname, `../emails_transacionais/criacao_de_employee.ejs`);

            const domain_site = process.env.URL_SITE;
            const domain_api = process.env.URL_API;

            const data = await ejs.renderFile(requiredPath, {
                name: user_create.name,
                name_blog: infos_blog?.name_blog,
                logo: infos_blog?.logo,
                domain_site: domain_site,
                domain_api: domain_api
            });

            await transporter.sendMail({
                from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,
                to: `${infos_blog?.email_blog}`,
                subject: `Novo usuario se cadastrando no CMS do ${infos_blog?.name_blog}`,
                html: data
            });

            if (send_email === true) {

                const infos_blog = await prismaClient.configurationBlog.findFirst();
                const requiredPath = path.join(__dirname, `../emails_transacionais/data_login_user.ejs`);

                const domain_site = process.env.URL_SITE;
                const domain_api = process.env.URL_API;

                const data = await ejs.renderFile(requiredPath, {
                    name: user_create.name,
                    email: user_create.email,
                    password: password,
                    name_blog: infos_blog?.name_blog,
                    logo: infos_blog?.logo,
                    domain_site: domain_site,
                    domain_api: domain_api
                });

                await transporter.sendMail({
                    from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,
                    to: user_create.email,
                    subject: `Dados de acesso CMS do ${infos_blog?.name_blog}`,
                    html: data
                });

            }

            return user_create;

        }

        const user_create_super_admin = await prismaClient.user.create({
            data: {
                name: name,
                slug_name: removerAcentos(name),
                email: email,
                image_user: image_user,
                password: passwordHash,
                role: RoleUser.SUPER_ADMIN
            }
        });

        await prismaClient.themeSettings.create({
            data: {
                primaryColor: '#ffffff',
                secondaryColor: '#000000',
                thirdColor: '#ef4444',
                fourthColor: "#797a7b",
                fifthColor: "#1f2937",
                sixthColor: "#f97316",
                primarybackgroundColor: '#000000',
                secondarybackgroundColor: '#f9fafb',
                thirdbackgroundColor: '#f3f4f6',
                fourthbackgroundColor: '#6b7280'
            }
        });

        const transporter = nodemailer.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            }
        });

        const infos_blog = await prismaClient.configurationBlog.findFirst();

        const requiredPath = path.join(__dirname, `../emails_transacionais/criacao_de_super_administrador.ejs`);

        const domain_site = process.env.URL_SITE;
        const domain_api = process.env.URL_API;

        const data = await ejs.renderFile(requiredPath, {
            name: user_create_super_admin.name,
            logo: infos_blog?.logo,
            name_blog: infos_blog?.name_blog,
            domain_site: domain_site,
            domain_api: domain_api
        });

        await transporter.sendMail({
            from: `"${infos_blog?.name_blog} " <${infos_blog?.email_blog}>`,
            to: user_create_super_admin.email,
            subject: `Novo super administrador se cadastrando no CMS do ${infos_blog?.name_blog}`,
            html: data
        });

        return user_create_super_admin;

    }

}

export { UserCreateService }
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv/config');
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
class UserCreateService {
    async execute({ name, email, password, image_user, role, send_email }) {
        function removerAcentos(s) {
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
        const userAlreadyExists = await prisma_1.default.user.findFirst({
            where: {
                email: email,
            }
        });
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 8);
        const first_super_user = await prisma_1.default.user.findFirst({
            where: {
                role: client_1.RoleUser.SUPER_ADMIN
            }
        });
        if (first_super_user) {
            const user_create = await prisma_1.default.user.create({
                data: {
                    name: name,
                    slug_name: removerAcentos(name),
                    email: email,
                    image_user: image_user,
                    password: passwordHash,
                    role: role,
                    status: client_1.StatusUser.Disponivel
                }
            });
            const transporter = nodemailer_1.default.createTransport({
                host: process.env.HOST_SMTP,
                port: 465,
                secure: true,
                auth: {
                    user: process.env.USER_SMTP,
                    pass: process.env.PASS_SMTP
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const users_superAdmins = await prisma_1.default.user.findMany({
                where: {
                    role: client_1.RoleUser.SUPER_ADMIN
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
            await prisma_1.default.notificationUser.createMany({
                data: notificationsData
            });
            const infos_blog = await prisma_1.default.configurationBlog.findFirst();
            const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/criacao_de_employee.ejs`);
            const domain_site = process.env.URL_SITE;
            const domain_api = process.env.URL_API;
            const data = await ejs_1.default.renderFile(requiredPath, {
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
                const infos_blog = await prisma_1.default.configurationBlog.findFirst();
                const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/data_login_user.ejs`);
                const domain_site = process.env.URL_SITE;
                const domain_api = process.env.URL_API;
                const data = await ejs_1.default.renderFile(requiredPath, {
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
        const colors = {
            textos_menu: "#FFFFFF",
            fundo_rodape: "#1f2937",
            setas_slides: "#FFFFFF",
            texto_rodape: "#FFFFFF",
            fundo_do_menu: "#000000",
            textos_botoes: "#ffffff",
            fundo_newslatter: "#6b7280",
            icone_login_menu: "#FFFFFF",
            texto_newslatter: "#000000",
            fundo_popup_login: "#ffffff",
            titulo_newslatter: "#FFFFFF",
            botao_like_dislike: "#374151",
            fundo_blocos_sobre: "#FFFFFF",
            fundo_setas_slides: "#1f2937",
            fundo_sidebar_site: "#f3f4f6",
            icone_usuario_menu: "#FFFFFF",
            texto_like_dislike: "#374151",
            texto_sobre_pagina: "#6b7280",
            textos_popup_login: "#000000",
            fundo_botao_validar: "#f97316",
            fundo_ultimos_posts: "#e5e9ee",
            texto_ultimos_posts: "#000000",
            titulo_pagina_sobre: "#000000",
            titulo_ultimos_posts: "#000000",
            fundo_popup_marketing: "#ffffff",
            texto_popup_marketing: "#000000",
            titulo_pagina_contato: "#000000",
            fundo_botao_newslatter: "#f97316",
            texto_botao_newslatter: "#FFFFFF",
            nome_usuario_comentario: "#000000",
            dados_usuario_comentario: "#4b5563",
            fundo_blocos_todos_posts: "#FFFFFF",
            botao_texto_slides_banner: "#FFFFFF",
            fundo_botao_login_usuario: "#f97316",
            fundo_botao_slides_banner: "#dd1818",
            segundo_fundo_layout_site: "#e1e4e9",
            texto_botao_login_usuario: "#FFFFFF",
            titulo_sobre_pagina_sobre: "#1f2937",
            terceiro_fundo_layout_site: "#e1e4e9",
            texto_publicidades_sidebar: "#000000",
            titulo_compartilhar_artigo: "#374151",
            fundo_botao_popup_marketing: "#dd1818",
            fundo_secoes_titulo_paginas: "#1f2937",
            texto_botao_popup_marketing: "#ffffff",
            titulo_secoes_titulo_paginas: "#FFFFFF",
            dados_post_blocos_todos_posts: "#6b7280",
            fundo_blocos_todas_categorias: "#1f2937",
            fundo_posts_mais_vizualizados: "#e5e9ee",
            texto_posts_mais_vizualizados: "#000000",
            fundo_botao_formulario_contato: "#dd1818",
            texto_chamada_para_acao_slides: "#FFFFFF",
            titulo_post_blocos_todos_posts: "#000000",
            titulo_posts_mais_vizualizados: "#000000",
            texto_categorias_pagina_inicial: "#ffffff",
            campos_inputs_formulario_contato: "#374151",
            descricoes_secoes_titulo_paginas: "#bdc1c6",
            fundo_botao_publicidades_sidebar: "#dd1818",
            fundo_categoria_no_bloco_do_post: "#dcfce7",
            texto_botao_publicidades_sidebar: "#ffffff",
            titulo_categorias_pagina_inicial: "#000000",
            leia_mais_post_blocos_todos_posts: "#dd1818",
            likes_e_dislike_usuario_comentario: "#6b7280",
            texto_nome_categoria_no_bloco_do_post: "#16a34a",
            vizualizacoes_posts_mais_vizualizados: "#000000",
            fundo_blocos_categorias_pagina_inicial: "#797a7b",
            mini_descricao_post_blocos_todos_posts: "#4b5563",
            nome_categoria_blocos_todas_categorias: "#FFFFFF",
            fundo_botao_enviar_comentario_e_cadastrar: "#16a34a",
            nome_subcategoria_blocos_todas_categorias: "#f97316",
            texto_botao_enviar_comentario_e_cadastrar: "#FFFFFF",
            descricao_categoria_blocos_todas_categorias: "#d1d5db",
            subcategoria_categoria_blocos_todas_categorias: "#f87171"
        };
        await prisma_1.default.themeSettings.create({
            data: { colors }
        });
        const user_create_super_admin = await prisma_1.default.user.create({
            data: {
                name: name,
                slug_name: removerAcentos(name),
                email: email,
                image_user: image_user,
                password: passwordHash,
                role: client_1.RoleUser.SUPER_ADMIN
            }
        });
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const infos_blog = await prisma_1.default.configurationBlog.findFirst();
        const requiredPath = path_1.default.join(__dirname, `../emails_transacionais/criacao_de_super_administrador.ejs`);
        const domain_site = process.env.URL_SITE;
        const domain_api = process.env.URL_API;
        const data = await ejs_1.default.renderFile(requiredPath, {
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
exports.UserCreateService = UserCreateService;
//# sourceMappingURL=UserCreateService.js.map
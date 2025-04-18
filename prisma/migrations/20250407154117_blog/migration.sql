-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('SUPER_ADMIN', 'EMPLOYEE', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusUserBlog" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusCategory" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusPost" AS ENUM ('Programado', 'Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusMarketingPublication" AS ENUM ('Programado', 'Fim_da_programacao', 'Disponivel', 'Disponivel_programado', 'Indisponivel');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('SLIDER', 'TOP_BANNER', 'SIDEBAR', 'POPUP');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(295) NOT NULL,
    "slug_name" VARCHAR(295) NOT NULL,
    "image_user" TEXT,
    "email" VARCHAR(180) NOT NULL,
    "password" TEXT NOT NULL,
    "status" "StatusUser" NOT NULL DEFAULT 'Disponivel',
    "role" "RoleUser" NOT NULL DEFAULT 'SUPER_ADMIN',
    "last_access" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userblogs" (
    "id" UUID NOT NULL,
    "name" VARCHAR(295) NOT NULL,
    "slug_name" VARCHAR(295) NOT NULL,
    "image_user" TEXT,
    "email" VARCHAR(180) NOT NULL,
    "password" TEXT NOT NULL,
    "status" "StatusUserBlog" NOT NULL DEFAULT 'Disponivel',
    "newsletter" BOOLEAN NOT NULL DEFAULT false,
    "last_access" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userblogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passwordrecoveryusers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "passwordrecoveryusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configurationsblog" (
    "id" TEXT NOT NULL,
    "name_blog" VARCHAR(725),
    "email_blog" VARCHAR(725),
    "phone" VARCHAR(725),
    "logo" TEXT,
    "favicon" TEXT,
    "description_blog" VARCHAR(15725),
    "author_blog" VARCHAR(225),
    "about_author_blog" TEXT,
    "privacy_policies" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configurationsblog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo_settings" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "keywords" JSONB,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImages" JSONB,
    "ogImageWidth" INTEGER,
    "ogImageHeight" INTEGER,
    "ogImageAlt" TEXT,
    "twitterTitle" TEXT,
    "twitterDescription" TEXT,
    "twitterCreator" TEXT,
    "twitterImages" JSONB,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seo_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialmediasblog" (
    "id" TEXT NOT NULL,
    "name_media" VARCHAR(725) NOT NULL,
    "link" TEXT,
    "logo_media" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "socialmediasblog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "themessettings" (
    "id" TEXT NOT NULL,
    "colors" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "themessettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name_category" TEXT NOT NULL,
    "slug_name_category" VARCHAR(300) NOT NULL,
    "image_category" TEXT,
    "description" VARCHAR(15725),
    "status" "StatusCategory" NOT NULL DEFAULT 'Disponivel',
    "order" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "tag_name" TEXT NOT NULL,
    "slug_tag_name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL,
    "author" TEXT NOT NULL,
    "title" VARCHAR(395) NOT NULL,
    "slug_title_post" TEXT NOT NULL,
    "text_post" TEXT NOT NULL,
    "image_post" TEXT,
    "status" "StatusPost" NOT NULL DEFAULT 'Disponivel',
    "publish_at" TIMESTAMPTZ(3),
    "post_like" DOUBLE PRECISION DEFAULT 0,
    "post_dislike" DOUBLE PRECISION DEFAULT 0,
    "views" DOUBLE PRECISION DEFAULT 0,
    "seo_description" VARCHAR(300),
    "seo_keywords" JSONB,
    "custom_url" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postlikes" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "ipAddress" VARCHAR(45),
    "isLike" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postlikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postviews" (
    "id" UUID NOT NULL,
    "post_id" UUID,
    "ipAddress" VARCHAR(45),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_on_posts" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "category_on_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_on_posts" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "tag_on_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "userBlog_id" UUID,
    "name_user" TEXT,
    "image_user" TEXT,
    "comment" VARCHAR(5000) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "nivel" DOUBLE PRECISION,
    "parentId" UUID,
    "comment_like" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "comment_dislike" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentlikes" (
    "id" UUID NOT NULL,
    "comment_id" UUID NOT NULL,
    "ipAddress" VARCHAR(45),
    "isLike" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commentlikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_contacts" (
    "id" TEXT NOT NULL,
    "name_user" VARCHAR(200) NOT NULL,
    "slug_name_user" TEXT NOT NULL,
    "email_user" VARCHAR(200) NOT NULL,
    "subject" VARCHAR(250) NOT NULL,
    "menssage" VARCHAR(5000) NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "form_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletters" (
    "id" TEXT NOT NULL,
    "email_user" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificationusers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "type" TEXT NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "notificationusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificationuserblogs" (
    "id" TEXT NOT NULL,
    "userBlog_id" UUID,
    "type" TEXT NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "notificationuserblogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketingpublications" (
    "id" UUID NOT NULL,
    "title" VARCHAR(555),
    "description" VARCHAR(7000),
    "local" VARCHAR(555),
    "image_url" VARCHAR(4083),
    "redirect_url" VARCHAR(5083),
    "position" "Position" NOT NULL,
    "conditions" TEXT,
    "clicks" DOUBLE PRECISION DEFAULT 0,
    "text_button" VARCHAR(100),
    "status" "StatusMarketingPublication" NOT NULL DEFAULT 'Disponivel',
    "text_publication" VARCHAR(7000),
    "popup_time" INTEGER,
    "publish_at_start" TIMESTAMPTZ(3),
    "publish_at_end" TIMESTAMPTZ(3),
    "is_processing" BOOLEAN NOT NULL DEFAULT false,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "email_sent" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "marketingpublications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bannerintervals" (
    "id" TEXT NOT NULL,
    "interval_banner" INTEGER NOT NULL,
    "label_interval_banner" TEXT NOT NULL,
    "local_site" TEXT,
    "label_local_site" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "bannerintervals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketingpublicationviews" (
    "id" UUID NOT NULL,
    "marketingPublication_id" UUID,
    "ipAddress" VARCHAR(45),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "marketingpublicationviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userblogs_name_key" ON "userblogs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "userblogs_email_key" ON "userblogs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "seo_settings_page_key" ON "seo_settings"("page");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_category_key" ON "categories"("name_category");

-- CreateIndex
CREATE UNIQUE INDEX "tags_tag_name_key" ON "tags"("tag_name");

-- CreateIndex
CREATE UNIQUE INDEX "posts_custom_url_key" ON "posts"("custom_url");

-- CreateIndex
CREATE UNIQUE INDEX "postviews_post_id_ipAddress_key" ON "postviews"("post_id", "ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "category_on_posts_post_id_category_id_key" ON "category_on_posts"("post_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "tag_on_posts_post_id_tag_id_key" ON "tag_on_posts"("post_id", "tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "marketingpublicationviews_marketingPublication_id_ipAddress_key" ON "marketingpublicationviews"("marketingPublication_id", "ipAddress");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_fkey" FOREIGN KEY ("author") REFERENCES "users"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postlikes" ADD CONSTRAINT "postlikes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postviews" ADD CONSTRAINT "postviews_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_on_posts" ADD CONSTRAINT "category_on_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_on_posts" ADD CONSTRAINT "category_on_posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_on_posts" ADD CONSTRAINT "tag_on_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_on_posts" ADD CONSTRAINT "tag_on_posts_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userBlog_id_fkey" FOREIGN KEY ("userBlog_id") REFERENCES "userblogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlikes" ADD CONSTRAINT "commentlikes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationusers" ADD CONSTRAINT "notificationusers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationuserblogs" ADD CONSTRAINT "notificationuserblogs_userBlog_id_fkey" FOREIGN KEY ("userBlog_id") REFERENCES "userblogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketingpublicationviews" ADD CONSTRAINT "marketingpublicationviews_marketingPublication_id_fkey" FOREIGN KEY ("marketingPublication_id") REFERENCES "marketingpublications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `SEOSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "configurationsblog" ADD COLUMN     "favicon" TEXT;

-- DropTable
DROP TABLE "SEOSettings";

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

-- CreateIndex
CREATE UNIQUE INDEX "seo_settings_page_key" ON "seo_settings"("page");

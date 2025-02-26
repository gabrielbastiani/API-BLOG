/*
  Warnings:

  - You are about to drop the `pages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seoimages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "seoimages" DROP CONSTRAINT "seoimages_seoId_fkey";

-- DropForeignKey
ALTER TABLE "seos" DROP CONSTRAINT "seos_pageId_fkey";

-- DropTable
DROP TABLE "pages";

-- DropTable
DROP TABLE "seoimages";

-- DropTable
DROP TABLE "seos";

-- CreateTable
CREATE TABLE "SEOSettings" (
    "id" TEXT NOT NULL,
    "pagePath" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "keywords" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogType" TEXT,
    "ogImage" TEXT,
    "ogImageWidth" INTEGER,
    "ogImageHeight" INTEGER,
    "ogImageAlt" TEXT,
    "twitterCard" TEXT,
    "twitterSite" TEXT,
    "twitterImage" TEXT,

    CONSTRAINT "SEOSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SEOSettings_pagePath_key" ON "SEOSettings"("pagePath");

-- CreateIndex
CREATE INDEX "SEOSettings_pagePath_idx" ON "SEOSettings"("pagePath");

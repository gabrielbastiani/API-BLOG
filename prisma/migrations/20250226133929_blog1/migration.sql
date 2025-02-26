/*
  Warnings:

  - You are about to alter the column `text_button` on the `marketingpublications` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `local_site` on the `marketingpublicationviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "marketingpublications" ALTER COLUMN "text_button" DROP DEFAULT,
ALTER COLUMN "text_button" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "marketingpublicationviews" DROP COLUMN "local_site";

-- CreateTable
CREATE TABLE "pages" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seos" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "keywords" TEXT,
    "openGraph" JSONB,
    "twitter" JSONB,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seoimages" (
    "id" TEXT NOT NULL,
    "seoId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "alt" TEXT,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seoimages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pages_path_key" ON "pages"("path");

-- CreateIndex
CREATE UNIQUE INDEX "seos_pageId_key" ON "seos"("pageId");

-- AddForeignKey
ALTER TABLE "seos" ADD CONSTRAINT "seos_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seoimages" ADD CONSTRAINT "seoimages_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "seos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

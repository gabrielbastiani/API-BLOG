/*
  Warnings:

  - The `seo_keywords` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "seo_keywords",
ADD COLUMN     "seo_keywords" JSONB;

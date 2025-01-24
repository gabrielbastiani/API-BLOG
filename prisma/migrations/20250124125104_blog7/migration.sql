/*
  Warnings:

  - You are about to drop the column `interval_banner` on the `marketingpublications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "marketingpublications" DROP COLUMN "interval_banner";

-- CreateTable
CREATE TABLE "bannerintervals" (
    "id" TEXT NOT NULL,
    "local_site" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "bannerintervals_pkey" PRIMARY KEY ("id")
);

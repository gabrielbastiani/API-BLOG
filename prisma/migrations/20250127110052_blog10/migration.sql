/*
  Warnings:

  - Added the required column `label_interval_banner` to the `bannerintervals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bannerintervals" ADD COLUMN     "label_interval_banner" INTEGER NOT NULL;

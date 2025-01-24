/*
  Warnings:

  - You are about to drop the column `type` on the `marketingpublications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "marketingpublications" DROP COLUMN "type";

-- DropEnum
DROP TYPE "AdType";

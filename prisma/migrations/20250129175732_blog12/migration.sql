-- AlterTable
ALTER TABLE "marketingpublications" ALTER COLUMN "publish_at_start" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "publish_at_end" SET DATA TYPE TIMESTAMPTZ(3);

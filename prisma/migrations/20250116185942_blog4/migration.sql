-- CreateTable
CREATE TABLE "socialmediasblog" (
    "id" TEXT NOT NULL,
    "name_media" VARCHAR(725) NOT NULL,
    "link" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "socialmediasblog_pkey" PRIMARY KEY ("id")
);

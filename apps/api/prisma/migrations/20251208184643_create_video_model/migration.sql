-- CreateEnum
CREATE TYPE "SystemType" AS ENUM ('WEB', 'FOOD', 'AGRO', 'SALOES', 'PET', 'CLINICAS', 'SHOP');

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "transcription" TEXT,
    "videoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "system" "SystemType",
    "videoPublishDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

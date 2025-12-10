-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "embeddings" vector(768);

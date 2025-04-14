/*
  Warnings:

  - Made the column `gradedReaderId` on table `ReaderPart` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ReaderPart" DROP CONSTRAINT "ReaderPart_gradedReaderId_fkey";

-- AlterTable
ALTER TABLE "ContentBlock" ALTER COLUMN "audioUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ReaderPart" ALTER COLUMN "gradedReaderId" SET NOT NULL;

-- CreateTable
CREATE TABLE "FileAudio" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "readerId" TEXT,

    CONSTRAINT "FileAudio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReaderPart" ADD CONSTRAINT "ReaderPart_gradedReaderId_fkey" FOREIGN KEY ("gradedReaderId") REFERENCES "GradedReader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileAudio" ADD CONSTRAINT "FileAudio_readerId_fkey" FOREIGN KEY ("readerId") REFERENCES "GradedReader"("id") ON DELETE SET NULL ON UPDATE CASCADE;

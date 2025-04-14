-- CreateTable
CREATE TABLE "GradedReader" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "GradedReader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReaderPart" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "gradedReaderId" TEXT,

    CONSTRAINT "ReaderPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentBlock" (
    "id" TEXT NOT NULL,
    "originalText" TEXT NOT NULL,
    "translatedText" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "partId" TEXT,

    CONSTRAINT "ContentBlock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReaderPart" ADD CONSTRAINT "ReaderPart_gradedReaderId_fkey" FOREIGN KEY ("gradedReaderId") REFERENCES "GradedReader"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_partId_fkey" FOREIGN KEY ("partId") REFERENCES "ReaderPart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

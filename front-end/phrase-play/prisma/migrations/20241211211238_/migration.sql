-- CreateTable
CREATE TABLE "Books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BookPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    CONSTRAINT "BookPart_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Phrases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textOriginal" TEXT NOT NULL,
    "textTranslation" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "bookPartId" INTEGER NOT NULL,
    CONSTRAINT "Phrases_bookPartId_fkey" FOREIGN KEY ("bookPartId") REFERENCES "BookPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Books_title_key" ON "Books"("title");

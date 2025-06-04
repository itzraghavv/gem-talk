/*
  Warnings:

  - A unique constraint covering the columns `[userId,fileName]` on the table `PdfData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `PdfData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PdfData" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PdfData_userId_fileName_key" ON "PdfData"("userId", "fileName");

/*
  Warnings:

  - Added the required column `title` to the `ChatSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatSession" ADD COLUMN     "title" TEXT NOT NULL;

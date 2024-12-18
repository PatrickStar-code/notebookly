/*
  Warnings:

  - Made the column `content` on table `NoteModel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "NoteModel" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DEFAULT '';

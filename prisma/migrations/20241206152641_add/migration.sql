/*
  Warnings:

  - Added the required column `image` to the `NoteModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NoteModel" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserModel" ADD COLUMN     "image" TEXT;

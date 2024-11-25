/*
  Warnings:

  - Added the required column `image` to the `NotebookModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotebookModel" ADD COLUMN     "image" TEXT NOT NULL;

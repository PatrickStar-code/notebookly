/*
  Warnings:

  - Added the required column `Emotion` to the `NoteModel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NoteEmotion" AS ENUM ('HAPPY', 'SAD', 'EXCITED', 'ANXIOUS', 'CALM', 'GRATEFUL', 'TIRED', 'MOTIVATED', 'FRUSTRATED', 'LONELY', 'PROUD', 'RELAXED', 'INSPIRED', 'CONFUSED', 'NOSTALGIC', 'ANGRY', 'BORED', 'STRESSED', 'HOPEFUL', 'CURIOUS', 'NEUTRAL');

-- AlterTable
ALTER TABLE "NoteModel" ADD COLUMN     "Emotion" "NoteEmotion" NOT NULL;

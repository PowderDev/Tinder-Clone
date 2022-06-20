/*
  Warnings:

  - A unique constraint covering the columns `[participantIds]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "participantIds" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "Chat_participantIds_key" ON "Chat"("participantIds");

/*
  Warnings:

  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Token" DROP CONSTRAINT "Token_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("id");

/*
  Warnings:

  - You are about to drop the column `curtido` on the `produtos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "curtido",
ADD COLUMN     "avaliacao" INTEGER NOT NULL DEFAULT 0;

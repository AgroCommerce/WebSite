/*
  Warnings:

  - Added the required column `url-imagem` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "url-imagem" TEXT NOT NULL;

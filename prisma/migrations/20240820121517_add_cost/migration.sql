/*
  Warnings:

  - Added the required column `custo-produto` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "custo-produto" DECIMAL(65,30) NOT NULL;

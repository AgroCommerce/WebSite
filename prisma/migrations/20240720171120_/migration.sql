/*
  Warnings:

  - Added the required column `data-nascimento` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "celular" BIGINT,
ADD COLUMN     "data-nascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "genero" TEXT;

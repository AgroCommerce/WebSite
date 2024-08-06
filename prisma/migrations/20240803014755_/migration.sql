/*
  Warnings:

  - Added the required column `nome-destinatario` to the `endereco-usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo-endereco` to the `endereco-usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "endereco-usuario" ADD COLUMN     "nome-destinatario" TEXT NOT NULL,
ADD COLUMN     "tipo-endereco" TEXT NOT NULL;

/*
  Warnings:

  - You are about to alter the column `cep` on the `endereco-usuario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cnpj` on the `produtores` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `telefone` on the `produtores` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `quantidade` on the `produtos-venda` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cpf` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "endereco-usuario" ALTER COLUMN "cep" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "produtores" ALTER COLUMN "cnpj" SET DATA TYPE INTEGER,
ALTER COLUMN "telefone" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "produtos-venda" ALTER COLUMN "quantidade" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "cpf" SET DATA TYPE INTEGER;

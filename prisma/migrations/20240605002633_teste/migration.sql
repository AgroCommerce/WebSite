/*
  Warnings:

  - You are about to drop the column `quantity` on the `carrinho-de-compras` table. All the data in the column will be lost.
  - You are about to drop the column `produtos-id` on the `vendas` table. All the data in the column will be lost.
  - You are about to drop the `comentario-produtos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recriar-senha` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comentario-produtos" DROP CONSTRAINT "comentario-produtos_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "recriar-senha" DROP CONSTRAINT "recriar-senha_usuario_id_fkey";

-- AlterTable
ALTER TABLE "carrinho-de-compras" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "vendas" DROP COLUMN "produtos-id";

-- DropTable
DROP TABLE "comentario-produtos";

-- DropTable
DROP TABLE "recriar-senha";

-- CreateTable
CREATE TABLE "produtos-venda" (
    "id" SERIAL NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "venda_id" INTEGER NOT NULL,
    "quantidade" BIGINT NOT NULL,

    CONSTRAINT "produtos-venda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produtos-venda" ADD CONSTRAINT "produtos-venda_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos-venda" ADD CONSTRAINT "produtos-venda_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

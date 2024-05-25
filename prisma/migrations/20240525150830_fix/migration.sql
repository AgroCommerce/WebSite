/*
  Warnings:

  - You are about to drop the column `shoppingCartId` on the `produtos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_likedProductsId_fkey";

-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_shoppingCartId_fkey";

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "shoppingCartId";

-- AddForeignKey
ALTER TABLE "produtos-curtidos" ADD CONSTRAINT "produtos-curtidos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinho-de-compras" ADD CONSTRAINT "carrinho-de-compras_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

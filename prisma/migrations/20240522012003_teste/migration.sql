/*
  Warnings:

  - You are about to drop the column `productId` on the `carrinho-de-compras` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `produtos-curtidos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[produto_id]` on the table `carrinho-de-compras` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[produto_id]` on the table `produtos-curtidos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `produto_id` to the `carrinho-de-compras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produto_id` to the `produtos-curtidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "carrinho-de-compras_productId_key";

-- DropIndex
DROP INDEX "carrinho-de-compras_usuario_id_key";

-- DropIndex
DROP INDEX "produtos-curtidos_productId_key";

-- DropIndex
DROP INDEX "produtos-curtidos_usuario_id_key";

-- AlterTable
ALTER TABLE "carrinho-de-compras" DROP COLUMN "productId",
ADD COLUMN     "produto_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "likedProductsId" INTEGER,
ADD COLUMN     "shoppingCartId" INTEGER;

-- AlterTable
ALTER TABLE "produtos-curtidos" DROP COLUMN "productId",
ADD COLUMN     "produto_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "carrinho-de-compras_produto_id_key" ON "carrinho-de-compras"("produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "produtos-curtidos_produto_id_key" ON "produtos-curtidos"("produto_id");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "carrinho-de-compras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_likedProductsId_fkey" FOREIGN KEY ("likedProductsId") REFERENCES "produtos-curtidos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

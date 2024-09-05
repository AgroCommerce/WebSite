-- DropForeignKey
ALTER TABLE "carrinho-de-compras" DROP CONSTRAINT "carrinho-de-compras_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "carrinho-de-compras" DROP CONSTRAINT "carrinho-de-compras_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "produtores" DROP CONSTRAINT "produtores_userId_fkey";

-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_produtor_id_fkey";

-- DropForeignKey
ALTER TABLE "produtos-curtidos" DROP CONSTRAINT "produtos-curtidos_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "produtos-curtidos" DROP CONSTRAINT "produtos-curtidos_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "produtos-venda" DROP CONSTRAINT "produtos-venda_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "produtos-venda" DROP CONSTRAINT "produtos-venda_venda_id_fkey";

-- DropForeignKey
ALTER TABLE "vendas" DROP CONSTRAINT "vendas_usuario_id_fkey";

-- AddForeignKey
ALTER TABLE "produtos-curtidos" ADD CONSTRAINT "produtos-curtidos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos-curtidos" ADD CONSTRAINT "produtos-curtidos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinho-de-compras" ADD CONSTRAINT "carrinho-de-compras_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinho-de-compras" ADD CONSTRAINT "carrinho-de-compras_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtores" ADD CONSTRAINT "produtores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos-venda" ADD CONSTRAINT "produtos-venda_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "vendas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos-venda" ADD CONSTRAINT "produtos-venda_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

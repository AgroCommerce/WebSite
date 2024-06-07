-- DropForeignKey
ALTER TABLE "produtos-venda" DROP CONSTRAINT "produtos-venda_venda_id_fkey";

-- AlterTable
ALTER TABLE "produtos-venda" ALTER COLUMN "venda_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "produtos-venda" ADD CONSTRAINT "produtos-venda_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "vendas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

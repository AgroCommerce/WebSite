/*
  Warnings:

  - You are about to drop the column `productId` on the `interacao-cliente` table. All the data in the column will be lost.
  - Added the required column `produto_id` to the `interacao-cliente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `interacao-cliente` DROP FOREIGN KEY `interacao-cliente_productId_fkey`;

-- AlterTable
ALTER TABLE `interacao-cliente` DROP COLUMN `productId`,
    ADD COLUMN `produto_id` BIGINT NOT NULL;

-- CreateTable
CREATE TABLE `comentario-produtos` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `numero-avaliacoes` INTEGER NOT NULL,
    `produto_id` BIGINT NOT NULL,
    `criado-em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `interacao-cliente` ADD CONSTRAINT `interacao-cliente_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentario-produtos` ADD CONSTRAINT `comentario-produtos_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `clientes` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `CPF` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `clientes_CPF_key`(`CPF`),
    UNIQUE INDEX `clientes_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interacao-cliente` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `curtido` BOOLEAN NOT NULL,
    `carrinho-de-compras` BOOLEAN NOT NULL,
    `criado-em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cliente-id` VARCHAR(191) NOT NULL,
    `productId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco-cliente` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cliente-id` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtores` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `razao-social` VARCHAR(191) NOT NULL,
    `nome-fantasia` VARCHAR(191) NOT NULL,
    `CNPJ` VARCHAR(191) NOT NULL,
    `CPF` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `criado-em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `produtores_CNPJ_key`(`CNPJ`),
    UNIQUE INDEX `produtores_CPF_key`(`CPF`),
    UNIQUE INDEX `produtores_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco-produtor` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `produtor_id` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recriar-senha` (
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `criado-em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nova-senha-produtor` VARCHAR(191) NOT NULL,
    `nova-senha-cliente` VARCHAR(191) NOT NULL,
    `produtor_id` VARCHAR(191) NOT NULL,
    `cliente_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `recriar-senha_email_key`(`email`),
    INDEX `recriar-senha_email_token_idx`(`email`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `quantidade` BIGINT NOT NULL,
    `criado-em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `produtor_id` VARCHAR(191) NOT NULL,
    `logVendaId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log-vendas` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `clientId` VARCHAR(191) NOT NULL,
    `vendido-em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `interacao-cliente` ADD CONSTRAINT `interacao-cliente_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interacao-cliente` ADD CONSTRAINT `interacao-cliente_cliente-id_fkey` FOREIGN KEY (`cliente-id`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `endereco-cliente` ADD CONSTRAINT `endereco-cliente_cliente-id_fkey` FOREIGN KEY (`cliente-id`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `endereco-produtor` ADD CONSTRAINT `endereco-produtor_produtor_id_fkey` FOREIGN KEY (`produtor_id`) REFERENCES `produtores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recriar-senha` ADD CONSTRAINT `recriar-senha_produtor_id_fkey` FOREIGN KEY (`produtor_id`) REFERENCES `produtores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recriar-senha` ADD CONSTRAINT `recriar-senha_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `produtos_produtor_id_fkey` FOREIGN KEY (`produtor_id`) REFERENCES `produtores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `produtos_logVendaId_fkey` FOREIGN KEY (`logVendaId`) REFERENCES `log-vendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log-vendas` ADD CONSTRAINT `log-vendas_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `endereco-cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `endereco-produtor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interacao-cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `CPF` on the `produtores` table. All the data in the column will be lost.
  - You are about to drop the column `criado-em` on the `produtores` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `produtores` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `produtores` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `produtores` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `log-vendas` table. All the data in the column will be lost.
  - You are about to drop the column `nova-senha-cliente` on the `recriar-senha` table. All the data in the column will be lost.
  - You are about to drop the column `nova-senha-produtor` on the `recriar-senha` table. All the data in the column will be lost.
  - Added the required column `userId` to the `log-vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nova-senha-usuario` to the `recriar-senha` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "clientes_email_key";

-- DropIndex
DROP INDEX "clientes_CPF_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "clientes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "endereco-cliente";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "endereco-produtor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "interacao-cliente";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "produtor_id" TEXT,
    "nome" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "usuarios_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "interacao-usuario" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "curtido" BOOLEAN NOT NULL,
    "carrinho-de-compras" BOOLEAN NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cliente-id" TEXT NOT NULL,
    "produto_id" BIGINT NOT NULL,
    CONSTRAINT "interacao-usuario_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "interacao-usuario_cliente-id_fkey" FOREIGN KEY ("cliente-id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "endereco-usuario" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "cliente-id" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    CONSTRAINT "endereco-usuario_cliente-id_fkey" FOREIGN KEY ("cliente-id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produtores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "razao-social" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "telefone" BIGINT NOT NULL
);
INSERT INTO "new_produtores" ("CNPJ", "id", "razao-social", "telefone") SELECT "CNPJ", "id", "razao-social", "telefone" FROM "produtores";
DROP TABLE "produtores";
ALTER TABLE "new_produtores" RENAME TO "produtores";
CREATE UNIQUE INDEX "produtores_CNPJ_key" ON "produtores"("CNPJ");
CREATE TABLE "new_log-vendas" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "vendido-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "log-vendas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_log-vendas" ("id", "vendido-em") SELECT "id", "vendido-em" FROM "log-vendas";
DROP TABLE "log-vendas";
ALTER TABLE "new_log-vendas" RENAME TO "log-vendas";
CREATE TABLE "new_recriar-senha" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nova-senha-usuario" TEXT NOT NULL,
    "produtor_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    CONSTRAINT "recriar-senha_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_recriar-senha" ("cliente_id", "criado-em", "email", "produtor_id", "token") SELECT "cliente_id", "criado-em", "email", "produtor_id", "token" FROM "recriar-senha";
DROP TABLE "recriar-senha";
ALTER TABLE "new_recriar-senha" RENAME TO "recriar-senha";
CREATE UNIQUE INDEX "recriar-senha_email_key" ON "recriar-senha"("email");
CREATE INDEX "recriar-senha_email_token_idx" ON "recriar-senha"("email", "token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_CPF_key" ON "usuarios"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

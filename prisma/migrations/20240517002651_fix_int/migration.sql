/*
  Warnings:

  - The primary key for the `produtos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `comentario-produtos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `comentario-produtos` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `produto_id` on the `comentario-produtos` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `produto_id` on the `interacao-usuario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `productId` on the `vendas` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "quantidade" BIGINT NOT NULL,
    "palavras-chaves" TEXT NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produtor_id" TEXT NOT NULL,
    CONSTRAINT "produtos_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("criado-em", "descricao", "id", "palavras-chaves", "preco", "produtor_id", "quantidade", "titulo") SELECT "criado-em", "descricao", "id", "palavras-chaves", "preco", "produtor_id", "quantidade", "titulo" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE TABLE "new_comentario-produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "numero-avaliacoes" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "comentario-produtos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_comentario-produtos" ("criado-em", "descricao", "id", "numero-avaliacoes", "produto_id", "titulo") SELECT "criado-em", "descricao", "id", "numero-avaliacoes", "produto_id", "titulo" FROM "comentario-produtos";
DROP TABLE "comentario-produtos";
ALTER TABLE "new_comentario-produtos" RENAME TO "comentario-produtos";
CREATE TABLE "new_interacao-usuario" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "curtido" BOOLEAN NOT NULL,
    "carrinho-de-compras" BOOLEAN NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,
    "produto_id" INTEGER NOT NULL,
    CONSTRAINT "interacao-usuario_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "interacao-usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_interacao-usuario" ("carrinho-de-compras", "criado-em", "curtido", "id", "produto_id", "usuario_id") SELECT "carrinho-de-compras", "criado-em", "curtido", "id", "produto_id", "usuario_id" FROM "interacao-usuario";
DROP TABLE "interacao-usuario";
ALTER TABLE "new_interacao-usuario" RENAME TO "interacao-usuario";
CREATE TABLE "new_vendas" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "vendido-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "vendas_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "vendas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_vendas" ("id", "productId", "userId", "vendido-em") SELECT "id", "productId", "userId", "vendido-em" FROM "vendas";
DROP TABLE "vendas";
ALTER TABLE "new_vendas" RENAME TO "vendas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

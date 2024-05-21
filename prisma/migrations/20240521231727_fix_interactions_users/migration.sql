/*
  Warnings:

  - You are about to drop the `interacao-usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shoppingCartId` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "interacao-usuario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "carrinho-de-compras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" TEXT NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "carrinho-de-compras_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "shoppingCartId" INTEGER NOT NULL,
    CONSTRAINT "produtos_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "carrinho-de-compras" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produtos_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("criado-em", "descricao", "id", "palavras-chaves", "preco", "produtor_id", "quantidade", "titulo") SELECT "criado-em", "descricao", "id", "palavras-chaves", "preco", "produtor_id", "quantidade", "titulo" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE UNIQUE INDEX "produtos_produtor_id_key" ON "produtos"("produtor_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "carrinho-de-compras_usuario_id_key" ON "carrinho-de-compras"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "carrinho-de-compras_produto_id_key" ON "carrinho-de-compras"("produto_id");

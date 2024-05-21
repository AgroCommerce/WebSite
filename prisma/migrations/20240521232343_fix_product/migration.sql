-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shoppingCartId" INTEGER,
    "descricao" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "quantidade" BIGINT NOT NULL,
    "palavras-chaves" TEXT NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produtor_id" TEXT NOT NULL,
    CONSTRAINT "produtos_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "carrinho-de-compras" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "produtos_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("criado-em", "descricao", "id", "palavras-chaves", "preco", "produtor_id", "quantidade", "shoppingCartId", "titulo") SELECT "criado-em", "descricao", "id", "palavras-chaves", "preco", "produtor_id", "quantidade", "shoppingCartId", "titulo" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE UNIQUE INDEX "produtos_produtor_id_key" ON "produtos"("produtor_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

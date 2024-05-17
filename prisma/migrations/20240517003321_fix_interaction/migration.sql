/*
  Warnings:

  - Made the column `usuario_id` on table `interacao-usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_interacao-usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "curtido" BOOLEAN,
    "carrinho-de-compras" BOOLEAN,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,
    "produto_id" INTEGER,
    CONSTRAINT "interacao-usuario_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "interacao-usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_interacao-usuario" ("carrinho-de-compras", "criado-em", "curtido", "id", "produto_id", "usuario_id") SELECT "carrinho-de-compras", "criado-em", "curtido", "id", "produto_id", "usuario_id" FROM "interacao-usuario";
DROP TABLE "interacao-usuario";
ALTER TABLE "new_interacao-usuario" RENAME TO "interacao-usuario";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

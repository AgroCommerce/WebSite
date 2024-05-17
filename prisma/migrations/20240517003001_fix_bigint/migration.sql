/*
  Warnings:

  - The primary key for the `interacao-usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `interacao-usuario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_interacao-usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

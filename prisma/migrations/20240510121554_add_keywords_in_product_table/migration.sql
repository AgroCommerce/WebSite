/*
  Warnings:

  - Added the required column `palavras-chaves` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produtos" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "descricao" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "quantidade" BIGINT NOT NULL,
    "palavras-chaves" TEXT NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produtor_id" TEXT NOT NULL,
    "logVendaId" BIGINT NOT NULL,
    CONSTRAINT "produtos_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produtos_logVendaId_fkey" FOREIGN KEY ("logVendaId") REFERENCES "log-vendas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("criado-em", "descricao", "id", "logVendaId", "preco", "produtor_id", "quantidade", "titulo") SELECT "criado-em", "descricao", "id", "logVendaId", "preco", "produtor_id", "quantidade", "titulo" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

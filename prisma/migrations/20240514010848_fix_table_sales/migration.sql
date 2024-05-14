/*
  Warnings:

  - You are about to drop the `log-vendas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `logVendaId` on the `produtos` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "log-vendas";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "vendas" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "productId" BIGINT NOT NULL,
    "vendido-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "vendas_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "vendas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    CONSTRAINT "produtos_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("criado-em", "descricao", "id", "palavras-chaves", "preco", "produtor_id", "quantidade", "titulo") SELECT "criado-em", "descricao", "id", "palavras-chaves", "preco", "produtor_id", "quantidade", "titulo" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

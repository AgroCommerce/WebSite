/*
  Warnings:

  - You are about to alter the column `telefone` on the `produtores` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produtores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "razao-social" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_produtores" ("CNPJ", "CPF", "criado-em", "email", "id", "nome", "razao-social", "senha", "telefone") SELECT "CNPJ", "CPF", "criado-em", "email", "id", "nome", "razao-social", "senha", "telefone" FROM "produtores";
DROP TABLE "produtores";
ALTER TABLE "new_produtores" RENAME TO "produtores";
CREATE UNIQUE INDEX "produtores_CNPJ_key" ON "produtores"("CNPJ");
CREATE UNIQUE INDEX "produtores_CPF_key" ON "produtores"("CPF");
CREATE UNIQUE INDEX "produtores_email_key" ON "produtores"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

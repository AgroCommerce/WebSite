-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_clientes" ("CPF", "createdAt", "email", "id", "nome", "senha") SELECT "CPF", "createdAt", "email", "id", "nome", "senha" FROM "clientes";
DROP TABLE "clientes";
ALTER TABLE "new_clientes" RENAME TO "clientes";
CREATE UNIQUE INDEX "clientes_CPF_key" ON "clientes"("CPF");
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

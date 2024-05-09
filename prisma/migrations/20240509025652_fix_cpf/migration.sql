/*
  Warnings:

  - You are about to drop the column `CPF` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `cliente-id` on the `interacao-usuario` table. All the data in the column will be lost.
  - You are about to drop the column `cliente-id` on the `endereco-usuario` table. All the data in the column will be lost.
  - Added the required column `cpf` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cliente_id` to the `interacao-usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cliente_id` to the `endereco-usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "produtor_id" TEXT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "usuarios_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_usuarios" ("cargo", "createdAt", "email", "id", "nome", "produtor_id", "senha") SELECT "cargo", "createdAt", "email", "id", "nome", "produtor_id", "senha" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
CREATE TABLE "new_interacao-usuario" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "curtido" BOOLEAN NOT NULL,
    "carrinho-de-compras" BOOLEAN NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cliente_id" TEXT NOT NULL,
    "produto_id" BIGINT NOT NULL,
    CONSTRAINT "interacao-usuario_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "interacao-usuario_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_interacao-usuario" ("carrinho-de-compras", "criado-em", "curtido", "id", "produto_id") SELECT "carrinho-de-compras", "criado-em", "curtido", "id", "produto_id" FROM "interacao-usuario";
DROP TABLE "interacao-usuario";
ALTER TABLE "new_interacao-usuario" RENAME TO "interacao-usuario";
CREATE TABLE "new_endereco-usuario" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "cliente_id" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    CONSTRAINT "endereco-usuario_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_endereco-usuario" ("bairro", "cep", "cidade", "endereco", "estado", "id", "numero", "pais") SELECT "bairro", "cep", "cidade", "endereco", "estado", "id", "numero", "pais" FROM "endereco-usuario";
DROP TABLE "endereco-usuario";
ALTER TABLE "new_endereco-usuario" RENAME TO "endereco-usuario";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

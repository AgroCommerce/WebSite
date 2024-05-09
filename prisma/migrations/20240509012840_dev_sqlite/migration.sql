-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "interacao-cliente" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "curtido" BOOLEAN NOT NULL,
    "carrinho-de-compras" BOOLEAN NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cliente-id" TEXT NOT NULL,
    "produto_id" BIGINT NOT NULL,
    CONSTRAINT "interacao-cliente_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "interacao-cliente_cliente-id_fkey" FOREIGN KEY ("cliente-id") REFERENCES "clientes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "endereco-cliente" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "cliente-id" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    CONSTRAINT "endereco-cliente_cliente-id_fkey" FOREIGN KEY ("cliente-id") REFERENCES "clientes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "produtores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "razao-social" TEXT NOT NULL,
    "nome-fantasia" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "endereco-produtor" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "produtor_id" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    CONSTRAINT "endereco-produtor_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "recriar-senha" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nova-senha-produtor" TEXT NOT NULL,
    "nova-senha-cliente" TEXT NOT NULL,
    "produtor_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    CONSTRAINT "recriar-senha_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "recriar-senha_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "descricao" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "quantidade" BIGINT NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produtor_id" TEXT NOT NULL,
    "logVendaId" BIGINT NOT NULL,
    CONSTRAINT "produtos_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produtos_logVendaId_fkey" FOREIGN KEY ("logVendaId") REFERENCES "log-vendas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "comentario-produtos" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "numero-avaliacoes" INTEGER NOT NULL,
    "produto_id" BIGINT NOT NULL,
    "criado-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "comentario-produtos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "log-vendas" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "vendido-em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "log-vendas_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_CPF_key" ON "clientes"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produtores_CNPJ_key" ON "produtores"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "produtores_CPF_key" ON "produtores"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "produtores_email_key" ON "produtores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "recriar-senha_email_key" ON "recriar-senha"("email");

-- CreateIndex
CREATE INDEX "recriar-senha_email_token_idx" ON "recriar-senha"("email", "token");

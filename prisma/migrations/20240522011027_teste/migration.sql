-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PRODUCER', 'USER');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos-curtidos" (
    "id" SERIAL NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "productId" INTEGER[],
    "criado-em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "produtos-curtidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrinho-de-compras" (
    "id" SERIAL NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "productId" INTEGER[],
    "criado-em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carrinho-de-compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endereco-usuario" (
    "id" SERIAL NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "cep" BIGINT NOT NULL,

    CONSTRAINT "endereco-usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtores" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "razao-social" TEXT NOT NULL,
    "cnpj" BIGINT NOT NULL,
    "telefone" BIGINT NOT NULL,

    CONSTRAINT "produtores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recriar-senha" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "criado-em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nova-senha-usuario" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,
    "quantidade" BIGINT NOT NULL,
    "palavras-chaves" TEXT NOT NULL,
    "criado-em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produtor_id" TEXT NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentario-produtos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "numero-avaliacoes" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "criado-em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comentario-produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendas" (
    "id" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "vendido-em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produtos-curtidos_usuario_id_key" ON "produtos-curtidos"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "produtos-curtidos_productId_key" ON "produtos-curtidos"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "carrinho-de-compras_usuario_id_key" ON "carrinho-de-compras"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "carrinho-de-compras_productId_key" ON "carrinho-de-compras"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "produtores_userId_key" ON "produtores"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "produtores_cnpj_key" ON "produtores"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "recriar-senha_email_key" ON "recriar-senha"("email");

-- CreateIndex
CREATE INDEX "recriar-senha_email_token_idx" ON "recriar-senha"("email", "token");

-- AddForeignKey
ALTER TABLE "produtos-curtidos" ADD CONSTRAINT "produtos-curtidos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinho-de-compras" ADD CONSTRAINT "carrinho-de-compras_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco-usuario" ADD CONSTRAINT "endereco-usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtores" ADD CONSTRAINT "produtores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recriar-senha" ADD CONSTRAINT "recriar-senha_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_produtor_id_fkey" FOREIGN KEY ("produtor_id") REFERENCES "produtores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario-produtos" ADD CONSTRAINT "comentario-produtos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

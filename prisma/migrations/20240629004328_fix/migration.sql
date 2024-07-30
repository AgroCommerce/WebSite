-- AlterTable
ALTER TABLE "endereco-usuario" ALTER COLUMN "cep" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "produtores" ALTER COLUMN "cnpj" SET DATA TYPE BIGINT,
ALTER COLUMN "telefone" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "produtos-venda" ALTER COLUMN "quantidade" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "cpf" SET DATA TYPE TEXT;

/*
  Warnings:

  - The `genero` column on the `usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Genders" AS ENUM ('MASC', 'FEM', 'OTHER', 'NOTTOSAY');

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "genero",
ADD COLUMN     "genero" "Genders";

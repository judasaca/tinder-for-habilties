/*
  Warnings:

  - Added the required column `calification` to the `Calification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calification" ADD COLUMN     "calification" DOUBLE PRECISION NOT NULL;

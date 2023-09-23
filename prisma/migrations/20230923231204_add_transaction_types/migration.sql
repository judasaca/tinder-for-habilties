/*
  Warnings:

  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('ACCEPT_CONTRACT', 'UPDATE_CONTRACT_TERMS', 'FINISH_CONTRACT', 'CANCEL_CONTRACT');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "type" "TransactionType" NOT NULL;

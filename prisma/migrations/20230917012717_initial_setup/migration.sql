-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('WAITING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ContractState" AS ENUM ('CREATED', 'ACCEPTED', 'REJECTED', 'FINISHED', 'CANCELED');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "contractID" INTEGER NOT NULL,
    "employeeAprove" BOOLEAN NOT NULL DEFAULT false,
    "bossAprove" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'WAITING',

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "bossId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "status" "ContractState" NOT NULL DEFAULT 'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "workHours" INTEGER NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hability" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hability" TEXT NOT NULL,

    CONSTRAINT "Hability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calification" (
    "id" SERIAL NOT NULL,
    "califiedUserId" INTEGER NOT NULL,
    "contractId" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Calification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Calification_contractId_key" ON "Calification"("contractId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_contractID_fkey" FOREIGN KEY ("contractID") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hability" ADD CONSTRAINT "Hability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calification" ADD CONSTRAINT "Calification_califiedUserId_fkey" FOREIGN KEY ("califiedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calification" ADD CONSTRAINT "Calification_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { PrismaClient } from '@prisma/client';
import type { Contract, Transaction } from '@prisma/client';

const prisma = new PrismaClient();

export const createTransaction = async (
  contract: Contract,
): Promise<Transaction> => {
  const result = await prisma.transaction.create({
    data: {
      bossAprove: true,
      employeeAprove: false,
      contractID: contract.id,
    },
  });
  return result;
};

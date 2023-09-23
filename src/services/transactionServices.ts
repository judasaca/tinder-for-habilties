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

export const retrieveActiveAtransactions = async (
  username: string,
): Promise<Transaction[]> => {
  //   const contracts = prisma.contract.findMany({
  //     where: {
  //       OR: [
  //         {
  //           bossId: userId,
  //         },
  //         {
  //           employeeId: userId,
  //         },
  //       ],
  //     },
  //   });
  const transactions = await prisma.transaction.findMany({
    where: {
      status: 'WAITING',
      contract: {
        OR: [
          {
            boss: {
              username,
            },
          },
          {
            employee: {
              username,
            },
          },
        ],
      },
    },
  });
  return transactions;
};

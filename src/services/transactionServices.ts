import { PrismaClient } from '@prisma/client';
import type { Contract, Transaction, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();

export const createTransaction = async (
  contract: Contract,
  type: TransactionType,
): Promise<Transaction> => {
  const transactions = await prisma.transaction.count({
    where: {
      contract: {
        id: contract.id,
      },
    },
  });
  if (transactions >= 1)
    throw new Error("You can't have more than 1 transaction per contract.");

  const result = await prisma.transaction.create({
    data: {
      bossAprove: true,
      employeeAprove: false,
      contractID: contract.id,
      type,
    },
  });
  return result;
};

export const retrieveActiveAtransactions = async (
  username: string,
): Promise<Transaction[]> => {
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

export const acceptTransaction = async (
  id: number,
  username: string,
): Promise<Contract | undefined> => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
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
  if (transaction === null)
    throw new Error('You have not active transactions with that ID.');

  if (transaction.type === 'ACCEPT_CONTRACT') {
    try {
      const [contractResults] = await prisma.$transaction([
        prisma.contract.update({
          where: {
            id: transaction.contractID,
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
            status: 'CREATED',
          },
          data: {
            status: 'ACCEPTED',
          },
        }),

        prisma.transaction.update({
          where: {
            id: transaction.id,
            OR: [
              {
                bossAprove: false,
                contract: {
                  boss: {
                    username,
                  },
                },
              },
              {
                employeeAprove: false,
                contract: {
                  employee: {
                    username,
                  },
                },
              },
            ],
          },
          data: {
            status: 'ACCEPTED',
          },
        }),
      ]);
      return contractResults;
    } catch (error) {
      throw new Error('You can not update this transaction.');
    }
  }
  return undefined;
};

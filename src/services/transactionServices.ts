import { PrismaClient } from '@prisma/client';
import type { Contract, Transaction, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();

export const createTransaction = async (
  contract: Contract,
  type: TransactionType,
): Promise<Transaction> => {
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
    const contract = await prisma.contract.update({
      where: {
        id: transaction.contractID,
        employee: {
          username,
        },
        status: 'CREATED',
      },
      data: {
        status: 'ACCEPTED',
      },
    });
    if (contract === null) throw new Error('You have not');
    return contract;
  }
  return undefined;
};

import { PrismaClient } from '@prisma/client';
import type { Contract } from '@prisma/client';

import type { newContractEntry } from '../types/contract';

const prisma = new PrismaClient();
export const toNewContractEntry = (req: any): newContractEntry => {
  const entry: newContractEntry = {
    name: req.name,
    boss: req.boss,
    employee: req.employee,
    hourly_rate: req.hourly_rate,
    work_hours: req.work_hours,
    details: req.details,
  };
  return entry;
};

export const createContract = async (
  contractEntry: newContractEntry,
): Promise<Contract> => {
  const employeeUserName = contractEntry.employee;
  const bossUserName = contractEntry.boss;
  const boss = await prisma.user.findUnique({
    where: {
      username: bossUserName,
    },
  });
  const employee = await prisma.user.findUnique({
    where: {
      username: employeeUserName,
    },
  });
  if (boss === null) throw new Error("Boss doesn't exist.");
  if (employee === null) throw new Error("Employee doesn't exist.");
  if (boss.id === employee.id)
    throw new Error('Employee and boss must be different.');

  const post = await prisma.contract.create({
    data: {
      details: contractEntry.details,
      hourlyRate: contractEntry.hourly_rate,
      name: contractEntry.name,
      workHours: contractEntry.work_hours,
      bossId: boss.id,
      employeeId: employee.id,
    },
  });
  return post;
};

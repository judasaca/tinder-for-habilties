import type { Contract, Transaction } from '@prisma/client';

export interface newContractEntry {
  name: string;
  boss: string;
  employee: string;
  hourly_rate: number;
  work_hours: number;
  details: string;
}

interface ContractsResponse {
  boss_contracts: Contract[];
  employee_contracts: Contract[];
}

interface CreateContractResponse {
  created_contract: Contract;
  related_transaction: Transaction;
}

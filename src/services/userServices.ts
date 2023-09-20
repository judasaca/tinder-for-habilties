import { PrismaClient } from '@prisma/client';
import type { CreateUserInput } from '../types';

const prisma = new PrismaClient();

export const createUser = async (newUser: CreateUserInput): Promise<void> => {
  const post = await prisma.user.create({
    data: newUser,
  });
  console.log(post);
};

import { PrismaClient } from '@prisma/client';
import type { CreateUserInput } from '../types';
import crypto from 'node:crypto';
const prisma = new PrismaClient();

export const createUser = async (newUser: CreateUserInput): Promise<void> => {
  newUser.password = crypto
    .createHash('sha256')
    .update(newUser.password)
    .digest('base64');
  const post = await prisma.user.create({
    data: newUser,
  });
  console.log(post);
};

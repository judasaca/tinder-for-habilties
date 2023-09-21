import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';
import type { CreateUserInput } from '../types';
import { generateHash } from '../utils/security';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export const createUser = async (newUser: CreateUserInput): Promise<void> => {
  newUser.password = generateHash(newUser.password);
  const post = await prisma.user.create({
    data: newUser,
  });
  console.log(post);
};

export const retrieveUser = async (username: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (user === null) {
    throw new Error('User does not exist');
  }
  return user;
};

export const authenticateUser = async (
  user: CreateUserInput,
): Promise<string> => {
  const hashedInputPassword = generateHash(user.password);
  const requestedUser = await retrieveUser(user.username);
  if (requestedUser.password === hashedInputPassword) {
    const secret = String(process.env.TOKEN_SECRET);
    const token = jwt.sign(
      {
        username: user.username,
      },
      secret,
      {
        expiresIn: '1800s',
      },
    );
    return token;
  } else {
    throw new Error('Wrong password');
  }
};

import type { CreateUserInput } from '../types';

const toNewUser = (obj: any): CreateUserInput => {
  const newUser: CreateUserInput = {
    username: obj.username,
    password: obj.password,
  };
  return newUser;
};

export default toNewUser;

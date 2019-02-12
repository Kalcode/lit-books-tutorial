import { signup } from './mutations/signup';
import { login } from './mutations/login';

function sayHello() {
  return 'Hello World';
}

export const resolvers = {
  Query: {
    sayHello,
  },
  Mutation: {
    login,
    signup,
  },
}; 
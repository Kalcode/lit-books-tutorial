import { login } from './mutations/login';
import { signup } from './mutations/signup';
import { user } from './queries/user';
import { users } from './queries/users';

export const resolvers = {
  Query: {
    users,
    user
  },
  Mutation: {
    login,
    signup,
  },
}; 
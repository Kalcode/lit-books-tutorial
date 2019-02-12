import { author } from './queries/author';
import { authors } from './queries/authors';
import { createAuthor } from './mutations/createAuthor';
import { login } from './mutations/login';
import { signup } from './mutations/signup';
import { user } from './queries/user';
import { users } from './queries/users';

export const resolvers = {
  Query: {
    author,
    authors,
    users,
    user
  },
  Mutation: {
    createAuthor,
    login,
    signup,
  },
}; 
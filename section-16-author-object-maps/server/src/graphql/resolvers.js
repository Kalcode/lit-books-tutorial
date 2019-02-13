import { author } from './queries/author';
import { authors } from './queries/authors';
import { Book } from './object-maps/Book';
import { book } from './queries/book';
import { books } from './queries/books';
import { createAuthor } from './mutations/createAuthor';
import { createBook } from './mutations/createBook';
import { login } from './mutations/login';
import { signup } from './mutations/signup';
import { user } from './queries/user';
import { users } from './queries/users';
import { Author } from './object-maps/Author';
export const resolvers = {
  Author,
  Book,
  Query: {
    author,
    authors,
    book,
    books,
    users,
    user
  },
  Mutation: {
    createAuthor,
    createBook,
    login,
    signup,
  },
}; 
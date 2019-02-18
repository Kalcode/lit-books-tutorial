import { Author } from './object-maps/Author';
import { author } from './queries/author';
import { authors } from './queries/authors';
import { Book } from './object-maps/Book';
import { book } from './queries/book';
import { books } from './queries/books';
import { createAuthor } from './mutations/createAuthor';
import { createBook } from './mutations/createBook';
import { createReview } from './mutations/createReview';
import { login } from './mutations/login';
import { signup } from './mutations/signup';
import { user } from './queries/user';
import { users } from './queries/users';
import { reviews } from './queries/reviews';
import { Review } from './object-maps/Review';

export const resolvers = {
  Author,
  Book,
  Review,
  Query: {
    author,
    authors,
    book,
    books,
    reviews,
    users,
    user
  },
  Mutation: {
    createAuthor,
    createBook,
    createReview,
    login,
    signup,
  },
}; 
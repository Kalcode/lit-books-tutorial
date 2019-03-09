import { Author as AuthorModel } from '../../db/models/Author';

export const Author = {
  books: async function(obj) {
    await AuthorModel.populate(obj, 'books');

    return obj.books;
  }
};
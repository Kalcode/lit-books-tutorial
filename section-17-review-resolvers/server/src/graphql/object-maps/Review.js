import { Book } from '../../db/models/Book';

export const Review = {
  book: async function(obj) {
    return Book.findById(obj.book);
  }
};
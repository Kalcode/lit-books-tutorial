import { Author } from '../../db/models/Author';
import { Book as BookModel } from '../../db/models/Book';

export const Book = {
  author: async function(obj) {
    return Author.findById(obj.author);
  },
  reviews: async function(obj) {
    await BookModel.populate(obj, 'reviews');

    return obj.reviews;
  }
};
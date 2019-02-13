import { Author } from '../../db/models/Author';

export const Book = {
  author: async function(obj) {
    return Author.findById(obj.author);
  }
};